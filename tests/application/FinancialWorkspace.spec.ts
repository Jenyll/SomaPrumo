import { describe, it, expect, beforeEach } from 'vitest';
import { FinancialWorkspace, BudgetService } from '../../src/application/financial';
import { MockFinancialRepository } from '../../src/infrastructure/repositories/MockFinancialRepository';
import { AccountType, InvestmentMovementType, InvoiceStatus, Money, ReceivableStatus } from '../../src/domain/financial';

const day = new Date('2026-09-20T12:00:00Z');
const money = (value: number) => new Money(value);
let workspace: FinancialWorkspace;
let sequence: number;
const command = () => ({ actorId: 'test-user', commandId: String(++sequence) });
function cash(name = 'Conta de teste', balance = 1000) {
  return workspace.createAccount(command(), { name, type: AccountType.CheckingAccount, initialBalance: money(balance) });
}
function card() {
  return workspace.createAccount(command(), { name: 'Cartão de teste', type: AccountType.CreditCard, initialBalance: money(0), creditLimit: money(2000) });
}
function purchase(accountId: string, extra = {}) {
  return workspace.recordPurchase(command(), { accountId, purchaseNumber: 1, date: day, amount: money(100),
    category: 'Serviços', firstMonth: 12, firstYear: 2026, ...extra });
}
beforeEach(() => { workspace = new FinancialWorkspace(new MockFinancialRepository()); sequence = 0; });

describe('Integração do financeiro com repositório auditado', () => {
  it('parcela em dezembro/janeiro/fevereiro conservando o total e a data de compra', () => {
    const accountId = card();
    purchase(accountId, { installments: 3 });
    const state = workspace.read();
    expect(state.installments.map(p => [p.competenceMonth, p.competenceYear, p.amount.amount]))
      .toEqual([[12, 2026, 33.33], [1, 2027, 33.33], [2, 2027, 33.34]]);
    expect(state.invoices.map(i => i.totalExpenses.amount)).toEqual([33.33, 33.33, 33.34]);
    expect(state.expenses[0].date.toISOString()).toBe(day.toISOString());
    expect(state.accounts[0].currentBalance.amount).toBe(100);
    expect(state.movements).toHaveLength(0); // Compra no cartão ainda não saiu do caixa.
  });

  it('conserva total da compra, de cada parcela e de cada pessoa em divisões combinadas', () => {
    const accountId = card();
    purchase(accountId, { installments: 3, people: [
      { personId: 'owner' }, { personId: 'guest-a' }, { personId: 'guest-b' },
    ] });
    const state = workspace.read();
    for (const installment of state.installments) {
      expect(state.details.filter(d => d.installmentId === installment.id)
        .reduce((sum, d) => sum + d.amount.toJSON(), 0)).toBe(installment.amount.toJSON());
    }
    expect(['owner', 'guest-a', 'guest-b'].map(person => state.details.filter(d => d.personId === person)
      .reduce((sum, d) => sum + d.amount.toJSON(), 0))).toEqual([3333, 3333, 3334]);
    expect(state.receivables.reduce((sum, r) => sum + r.originalAmount.toJSON(), 0)).toBe(6667);
    expect(state.receivables.every(r => r.debtorPersonId !== 'owner')).toBe(true);
  });

  it('preserva divisões personalizadas inclusive uma participação zero', () => {
    const accountId = card();
    purchase(accountId, { amount: money(0.07), installments: 3, people: [
      { personId: 'owner', amount: money(0) }, { personId: 'other', amount: money(0.07) },
    ] });
    const state = workspace.read();
    expect(state.receivables.reduce((sum, r) => sum + r.originalAmount.toJSON(), 0)).toBe(7);
    expect(state.details.filter(d => d.personId === 'owner').every(d => d.amount.isZero())).toBe(true);
  });

  it('paga parcialmente, fecha e quita sem duplicar despesas nem zerar terceiros', () => {
    const cashId = cash();
    const cardId = card();
    purchase(cardId, { amount: money(500), people: [{ personId: 'owner' }, { personId: 'guest' }] });
    const invoiceId = workspace.read().invoices[0].id;
    workspace.payInvoice(command(), invoiceId, { accountId: cashId, amount: money(200), date: day });
    workspace.closeInvoice(command(), invoiceId);
    let state = workspace.read();
    expect(state.invoices[0].balance.amount).toBe(300);
    expect(state.invoices[0].status).toBe(InvoiceStatus.PartiallyPaid);
    expect(state.invoices[0].receivablesFromThirdParties.amount).toBe(250);
    expect(state.invoices[0].isClosed).toBe(true);
    workspace.payInvoice(command(), invoiceId, { accountId: cashId, amount: money(300), date: day });
    state = workspace.read();
    expect(state.accounts.find(a => a.id === cashId)!.currentBalance.amount).toBe(500);
    expect(state.accounts.find(a => a.id === cardId)!.getAvailableCredit()!.amount).toBe(2000);
    expect(state.invoices[0].status).toBe(InvoiceStatus.Paid);
    expect(state.installments.reduce((sum, p) => sum + p.amount.amount, 0)).toBe(500);
    expect(state.receivables[0].pendingAmount.amount).toBe(250);
  });

  it('recebe em setembro uma dívida de outubro conservando as duas datas', () => {
    const cashId = cash();
    purchase(card(), { firstMonth: 10, people: [{ personId: 'owner' }, { personId: 'guest' }] });
    const receivableId = workspace.read().receivables[0].id;
    workspace.receive(command(), receivableId, { accountId: cashId, amount: money(20), date: day });
    const state = workspace.read();
    expect(state.receipts[0].date.getUTCMonth()).toBe(8);
    expect(state.receipts[0].competenceMonth).toBe(10);
    expect(state.receipts[0].invoiceId).toBe(state.invoices[0].id);
    expect(state.receivables[0].pendingAmount.amount).toBe(30);
    expect(state.receivables[0].status).toBe(ReceivableStatus.PartiallyReceived);
    expect(state.invoices[0].receivablesFromThirdParties.amount).toBe(30);
    expect(state.accounts.find(a => a.id === cashId)!.currentBalance.amount).toBe(1020);
    expect(state.movements.filter(m => m.type === 'entry')).toHaveLength(0);
  });

  it('baixa com motivo preservando valor original e recebimentos', () => {
    const cashId = cash();
    purchase(card(), { people: [{ personId: 'owner' }, { personId: 'guest' }] });
    const receivableId = workspace.read().receivables[0].id;
    workspace.receive(command(), receivableId, { accountId: cashId, amount: money(20), date: day });
    expect(() => workspace.writeOff(command(), receivableId, ' ')).toThrow();
    workspace.writeOff(command(), receivableId, 'Acordo documentado');
    const receivable = workspace.read().receivables[0];
    expect([receivable.originalAmount.amount, receivable.receivedAmount.amount, receivable.writtenOffAmount.amount, receivable.pendingAmount.amount])
      .toEqual([50, 20, 30, 0]);
    expect(() => workspace.receive(command(), receivableId, { accountId: cashId, amount: money(1), date: day })).toThrow();
  });

  it('transferência é atômica, neutra no total e rejeita repetição', () => {
    const source = cash('Origem', 1000);
    const destination = cash('Destino', 100);
    const context = command();
    workspace.transfer(context, { sourceAccountId: source, destinationAccountId: destination, amount: money(300), date: day });
    let state = workspace.read();
    expect(state.accounts.map(a => a.currentBalance.amount)).toEqual([700, 400]);
    expect(state.movements.map(m => m.type)).toEqual(['transfer_out', 'transfer_in']);
    const snapshot = JSON.stringify(state);
    expect(() => workspace.transfer(context, { sourceAccountId: source, destinationAccountId: destination, amount: money(300), date: day })).toThrow('já registrada');
    expect(() => workspace.transfer(command(), { sourceAccountId: source, destinationAccountId: source, amount: money(300), date: day })).toThrow();
    state = workspace.read();
    expect(JSON.stringify(state)).toBe(snapshot);
  });

  it('aporte e resgate afetam caixa; taxa e rendimento afetam o investimento', () => {
    const cashId = cash('Conta', 2000);
    const investment = workspace.createInvestment(command(), 'Renda fixa de teste');
    workspace.moveInvestment(command(), investment, { accountId: cashId, amount: money(1000), date: day, type: InvestmentMovementType.Buyback });
    workspace.moveInvestment(command(), investment, { accountId: cashId, amount: money(200), date: day, type: InvestmentMovementType.Redemption });
    workspace.moveInvestment(command(), investment, { amount: money(10), date: day, type: InvestmentMovementType.Fee });
    workspace.moveInvestment(command(), investment, { amount: money(25), date: day, type: InvestmentMovementType.Yield });
    expect(workspace.read().accounts[0].currentBalance.amount).toBe(1200);
    expect(workspace.read().investments[0].currentBalance.amount).toBe(815);
    const before = JSON.stringify(workspace.read());
    expect(() => workspace.moveInvestment(command(), investment, { accountId: cashId, amount: money(1000), date: day, type: InvestmentMovementType.Redemption })).toThrow();
    expect(JSON.stringify(workspace.read())).toBe(before);
  });

  it('orçamento mostra excesso e deixa de contar a provisão depois da realização', () => {
    const cashId = cash();
    workspace.createBudget(command(), { category: 'Serviços', competenceMonth: 12, competenceYear: 2026, plannedAmount: money(500) });
    const provision = workspace.createProvision(command(), { category: 'Serviços', competenceMonth: 12, competenceYear: 2026, amount: money(500) });
    purchase(cashId, { amount: money(650) });
    workspace.realizeProvision(command(), provision, workspace.read().installments[0].id);
    const state = workspace.read();
    const result = new BudgetService().compare(state.budgets[0], state.installments, state.provisions);
    expect([result.actual.amount, result.exceeded.amount, result.difference.amount, result.pending.amount, result.projected.amount]).toEqual([650, 150, -150, 0, 650]);
    expect(() => workspace.realizeProvision(command(), provision, state.installments[0].id)).toThrow();
  });

  it('filtra orçamento por categoria, mês e ano sem limite de 80% inventado', () => {
    const cashId = cash();
    workspace.createBudget(command(), { category: 'Serviços', competenceMonth: 12, competenceYear: 2026, plannedAmount: money(100) });
    purchase(cashId, { amount: money(90) });
    purchase(cashId, { purchaseNumber: 2, firstYear: 2027, amount: money(500) });
    purchase(cashId, { purchaseNumber: 3, category: 'Outra', amount: money(500) });
    expect(workspace.read().budgets[0].actualAmount.amount).toBe(90);
    expect(workspace.read().budgets[0].status).toBe('on_track');
  });

  it('agrupa pendências atravessando anos sem deslocar mês e ano', () => {
    purchase(card(), { amount: money(600), firstMonth: 11, installments: 6, people: [{ personId: 'owner' }, { personId: 'guest' }] });
    const summary = workspace.receivablesByPeriod(12, 2026);
    expect(Object.values(summary).map(m => m.amount)).toEqual([50, 50, 50, 50, 100, 0]);
  });

  it('preserva histórico inativo e impede novos movimentos nessa conta', () => {
    const accountId = cash();
    purchase(accountId);
    workspace.deactivateAccount(command(), accountId);
    const state = workspace.read();
    expect(state.accounts[0].isActive).toBe(false);
    expect(state.accounts[0].currentBalance.amount).toBe(900);
    expect(state.expenses).toHaveLength(1);
    expect(() => workspace.recordIncome(command(), { accountId, amount: money(10), date: day, description: 'Teste' })).toThrow('inativa');
  });

  it('não permite alterar o estado salvo por referências devolvidas', () => {
    cash();
    const snapshot = workspace.read();
    snapshot.accounts[0].deactivate();
    snapshot.audit[0].actorId = 'alterado';
    snapshot.accounts.splice(0);
    expect(workspace.read().accounts[0].isActive).toBe(true);
    expect(workspace.read().audit[0].actorId).toBe('test-user');
    expect(workspace.read().audit[0].timestamp).toBeInstanceOf(Date);
  });

  it('não grava compra parcialmente quando uma das competências está fechada', () => {
    const accountId = card();
    purchase(accountId, { firstMonth: 1, firstYear: 2027 });
    workspace.closeInvoice(command(), workspace.read().invoices[0].id);
    const before = JSON.stringify(workspace.read());
    expect(() => purchase(accountId, { purchaseNumber: 2, installments: 3 })).toThrow('fechada');
    expect(JSON.stringify(workspace.read())).toBe(before);
  });

  it('rejeita pagamento excedente, valor negativo, data inválida e operação sem responsável', () => {
    const cashId = cash();
    purchase(card());
    const invoiceId = workspace.read().invoices[0].id;
    const before = JSON.stringify(workspace.read());
    for (const value of [101, -1, 0]) expect(() => workspace.payInvoice(command(), invoiceId, { accountId: cashId, amount: money(value), date: day })).toThrow();
    expect(() => workspace.payInvoice(command(), invoiceId, { accountId: cashId, amount: money(1), date: new Date('invalid') })).toThrow();
    expect(() => workspace.recordIncome({ actorId: '', commandId: 'no-actor' }, { accountId: cashId, amount: money(10), date: day, description: 'Teste' })).toThrow();
    expect(JSON.stringify(workspace.read())).toBe(before);
  });

  it('começa vazio e não inventa valores na ausência de lançamentos', () => {
    expect(workspace.read().accounts).toHaveLength(0);
    expect(workspace.read().audit).toHaveLength(0);
    expect(Object.values(workspace.receivablesByPeriod(1, 2026)).every(m => m.isZero())).toBe(true);
    const accountId = cash('Saldo zero', 0);
    expect(workspace.read().accounts[0].currentBalance.amount).toBe(0);
    expect(() => purchase(accountId, { firstMonth: 13 })).toThrow();
    expect(() => purchase(accountId, { people: [{ personId: 'a', amount: money(100) }, { personId: 'b' }] })).toThrow();
  });
});
