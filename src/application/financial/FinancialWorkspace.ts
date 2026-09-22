import { AccountType, Budget, BudgetStatus, ExpenseDetail, Investment, InvestmentMovement,
  InvestmentMovementType, Money, Receivable, ReceivableStatus, Transfer, TransferType } from '../../domain/financial';
import { type CommandContext, type FinancialRepository, type FinancialState } from '../../domain/financial/FinancialRepository';
import { ExpenseInstallment } from '../../domain/financial/ExpenseInstallment';
import { Provision, type ProvisionProps } from '../../domain/financial/Provision';
import { date, nonnegative, period, positive, required } from '../../domain/financial/validation';
import { AccountService } from './AccountService';
import { ExpenseService, type SplitPerson } from './ExpenseService';
import { InvoiceService } from './InvoiceService';
import { BudgetService } from './BudgetService';

const id = () => crypto.randomUUID();
function find<T extends { id: string }>(items: T[], key: string): T {
  const item = items.find(value => value.id === key);
  if (!item) throw new Error('Registro não encontrado: ' + key);
  return item;
}

/** Casos de uso do financeiro. Todos os comandos persistidos passam pela unidade de trabalho auditada. */
export class FinancialWorkspace {
  private accounts = new AccountService();
  private expenses = new ExpenseService();
  private invoices = new InvoiceService();
  private budgets = new BudgetService();
  constructor(private readonly repository: FinancialRepository) {}
  read(): FinancialState { return this.repository.read(); }

  private change(context: CommandContext, action: string, run: (draft: FinancialState) => void): void {
    this.repository.transact(context, action, state => { run(state); this.refresh(state); });
  }
  private cash(state: FinancialState, accountId: string) {
    const account = find(state.accounts, accountId);
    if (!account.isActive) throw new Error('Conta inativa');
    if (account.type === AccountType.CreditCard || account.type === AccountType.Investment) throw new Error('Informe uma conta de caixa');
    return account;
  }
  private refresh(state: FinancialState): void {
    for (const invoice of state.invoices) {
      invoice.setReceivablesFromThirdParties(state.receivables.filter(r => r.invoiceId === invoice.id)
        .reduce((sum, r) => sum.add(r.pendingAmount), new Money(0)));
    }
    for (const account of state.accounts) {
      if (account.type === AccountType.CreditCard) {
        account.setCurrentBalance(state.invoices.filter(i => i.cardAccountId === account.id)
          .reduce((sum, invoice) => sum.add(invoice.balance), new Money(0)));
      } else {
        this.accounts.updateBalance(account, state.movements);
      }
    }
    state.budgets.forEach(budget => this.budgets.compare(budget, state.installments, state.provisions));
  }
  createAccount(context: CommandContext, data: Parameters<AccountService['createAccount']>[0]): string {
    const account = this.accounts.createAccount(data);
    if (data.type === AccountType.Investment) throw new Error('Use o cadastro de investimentos de renda fixa');
    if (data.type === AccountType.CreditCard && (!data.initialBalance.isZero() || data.creditLimit === undefined)) {
      throw new Error('Cartão requer limite e saldo inicial zero; registre o saldo devedor nas faturas');
    }
    this.change(context, 'account.create', state => {
      if (state.accounts.some(a => a.name.trim().toLocaleLowerCase('pt-BR') === data.name.trim().toLocaleLowerCase('pt-BR'))) throw new Error('Nome de conta duplicado');
      state.accounts.push(account);
    });
    return account.id;
  }
  deactivateAccount(context: CommandContext, accountId: string): void {
    this.change(context, 'account.deactivate', state => find(state.accounts, accountId).deactivate());
  }
  recordIncome(context: CommandContext, data: { accountId: string; amount: Money; date: Date; description: string }): void {
    this.change(context, 'income.record', state => {
      this.cash(state, data.accountId); positive(data.amount); required(data.description, 'Descrição');
      state.movements.push({ ...data, date: date(data.date), id: context.commandId, sourceId: context.commandId, type: 'entry' });
    });
  }
  recordPurchase(context: CommandContext, data: Parameters<ExpenseService['createExpense']>[0] & {
    accountId: string; firstMonth: number; firstYear: number; people?: SplitPerson[];
  }): string {
    const expense = this.expenses.createExpense(data);
    this.change(context, 'purchase.record', state => {
      const account = find(state.accounts, data.accountId);
      if (!account.isActive) throw new Error('Conta inativa');
      if (state.expenses.some(e => e.purchaseNumber === expense.purchaseNumber)) throw new Error('Número de compra duplicado');
      if (account.type !== AccountType.CreditCard) {
        this.cash(state, account.id);
        if (expense.installments !== 1) throw new Error('Parcelamento requer cartão; compromissos futuros usam provisões');
      }
      const schedule = this.expenses.schedule(expense, data.firstMonth, data.firstYear);
      // Valores personalizados da compra são distribuídos por parcela, preservando os totais por pessoa.
      const purchaseShares = data.people ? this.expenses.splitExpense(expense, data.people) : [];
      const remainingShares = purchaseShares.map(share => share.amount.toJSON());
      state.expenses.push(expense);
      for (const item of schedule) {
        let invoiceId: string | undefined;
        if (account.type === AccountType.CreditCard) {
          let invoice = state.invoices.find(i => i.cardAccountId === account.id && i.competenceMonth === item.competenceMonth && i.competenceYear === item.competenceYear);
          if (!invoice) {
            invoice = this.invoices.createInvoice({ cardAccountId: account.id, competenceMonth: item.competenceMonth, competenceYear: item.competenceYear });
            state.invoices.push(invoice);
          }
          invoice.setTotalExpenses(invoice.totalExpenses.add(item.amount));
          invoiceId = invoice.id;
        }
        const installment = new ExpenseInstallment(item.id, item.expenseId, item.number, item.amount,
          item.competenceMonth, item.competenceYear, item.category, invoiceId);
        state.installments.push(installment);
        // Alocação proporcional em centavos por parcela; o último período absorve apenas os resíduos.
        const remainingTotal = remainingShares.reduce((sum, cents) => sum + BigInt(cents), 0n);
        let unallocated = item.amount.toJSON();
        const amounts = remainingShares.map(cents => remainingTotal === 0n ? 0 :
          Number(BigInt(item.amount.toJSON()) * BigInt(cents) / remainingTotal));
        unallocated -= amounts.reduce((sum, cents) => sum + cents, 0);
        for (let i = amounts.length - 1; i >= 0 && unallocated > 0; i--) {
          const addition = Math.min(unallocated, remainingShares[i] - amounts[i]);
          amounts[i] += addition; unallocated -= addition;
        }
        purchaseShares.forEach((share, i) => {
          remainingShares[i] -= amounts[i];
          const detail = new ExpenseDetail({ id: id(), expenseId: expense.id, installmentId: installment.id,
            installmentNumber: installment.number, personId: share.personId, amount: Money.fromCents(amounts[i]),
            isPaymentOwner: share.isPaymentOwner, createdAt: new Date(), updatedAt: new Date() });
          state.details.push(detail);
          if (!share.isPaymentOwner && detail.amount.isPositive()) {
            state.receivables.push(new Receivable({ id: id(), debtorPersonId: share.personId!,
              creditorPersonId: purchaseShares.find(s => s.isPaymentOwner)!.personId!, expenseDetailId: detail.id,
              invoiceId, competenceMonth: installment.competenceMonth, competenceYear: installment.competenceYear,
              originalAmount: detail.amount, receivedAmount: new Money(0), status: ReceivableStatus.Pending,
              createdAt: new Date(), updatedAt: new Date() }));
          }
        });
      }
      if (account.type !== AccountType.CreditCard) state.movements.push({ id: context.commandId, sourceId: expense.id,
        accountId: account.id, type: 'expense', date: expense.date, amount: expense.amount });
    });
    return expense.id;
  }
  payInvoice(context: CommandContext, invoiceId: string, data: { accountId: string; amount: Money; date: Date }): void {
    this.change(context, 'invoice.pay', state => {
      this.cash(state, data.accountId);
      const invoice = find(state.invoices, invoiceId);
      const payment = this.invoices.registerPayment(invoice, { ...data, id: context.commandId });
      state.movements.push({ ...data, date: date(data.date), id: context.commandId, sourceId: payment.id, type: 'payment' });
    });
  }
  closeInvoice(context: CommandContext, invoiceId: string): void {
    this.change(context, 'invoice.close', state => find(state.invoices, invoiceId).close());
  }
  receive(context: CommandContext, receivableId: string, data: { accountId: string; amount: Money; date: Date }): void {
    this.change(context, 'receivable.receive', state => {
      this.cash(state, data.accountId);
      const receivable = find(state.receivables, receivableId);
      const receivedDate = date(data.date);
      receivable.registerReceipt(data.amount);
      state.receipts.push({ ...data, id: context.commandId, date: receivedDate, receivableId,
        invoiceId: receivable.invoiceId, competenceMonth: receivable.competenceMonth, competenceYear: receivable.competenceYear });
      state.movements.push({ ...data, id: context.commandId, date: receivedDate, sourceId: context.commandId, type: 'reimbursement' });
    });
  }
  writeOff(context: CommandContext, receivableId: string, reason: string): void {
    this.change(context, 'receivable.writeOff', state => find(state.receivables, receivableId).writeOff(reason));
  }
  transfer(context: CommandContext, data: { sourceAccountId: string; destinationAccountId: string; amount: Money; date: Date }): void {
    this.change(context, 'transfer.confirm', state => {
      this.cash(state, data.sourceAccountId); this.cash(state, data.destinationAccountId);
      const transfer = new Transfer({ ...data, id: context.commandId, type: TransferType.BetweenAccounts,
        isConfirmed: true, createdAt: new Date(), updatedAt: new Date() });
      state.transfers.push(transfer);
      state.movements.push({ id: context.commandId + ':out', sourceId: transfer.id, accountId: data.sourceAccountId,
        relatedAccountId: data.destinationAccountId, amount: data.amount, date: transfer.date, type: 'transfer_out' },
      { id: context.commandId + ':in', sourceId: transfer.id, accountId: data.destinationAccountId,
        relatedAccountId: data.sourceAccountId, amount: data.amount, date: transfer.date, type: 'transfer_in' });
    });
  }
  createInvestment(context: CommandContext, name: string): string {
    const investment = new Investment({ id: id(), name, isActive: true, currentBalance: new Money(0),
      movements: [], createdAt: new Date(), updatedAt: new Date() });
    this.change(context, 'investment.create', state => state.investments.push(investment));
    return investment.id;
  }
  moveInvestment(context: CommandContext, investmentId: string, data: {
    type: InvestmentMovementType; amount: Money; date: Date; accountId?: string;
  }): void {
    this.change(context, 'investment.move', state => {
      const investment = find(state.investments, investmentId);
      const movement = new InvestmentMovement({ ...data, id: context.commandId, investmentId, createdAt: new Date() });
      const cashMovement = data.type === InvestmentMovementType.Buyback || data.type === InvestmentMovementType.Redemption;
      if (cashMovement) {
        this.cash(state, data.accountId ?? '');
        state.movements.push({ id: context.commandId, accountId: data.accountId!, sourceId: movement.id,
          amount: data.amount, date: movement.date,
          type: data.type === InvestmentMovementType.Buyback ? 'investment_buyback' : 'investment_redemption' });
      } else if (data.accountId) throw new Error('Taxas e rendimentos deste módulo são internos ao investimento');
      investment.addMovement(movement);
    });
  }
  createBudget(context: CommandContext, data: { category: string; competenceMonth: number; competenceYear: number; plannedAmount: Money }): string {
    nonnegative(data.plannedAmount);
    const budget = new Budget({ ...data, id: id(), actualAmount: new Money(0), status: BudgetStatus.OnTrack, createdAt: new Date(), updatedAt: new Date() });
    this.change(context, 'budget.create', state => {
      if (state.budgets.some(b => b.category === data.category && b.competenceMonth === data.competenceMonth && b.competenceYear === data.competenceYear)) throw new Error('Orçamento duplicado');
      state.budgets.push(budget);
    });
    return budget.id;
  }
  createProvision(context: CommandContext, data: Omit<ProvisionProps, 'id' | 'isActive' | 'realizedInstallmentId'>): string {
    const provision = new Provision({ ...data, id: id(), isActive: true });
    this.change(context, 'provision.create', state => state.provisions.push(provision));
    return provision.id;
  }
  realizeProvision(context: CommandContext, provisionId: string, installmentId: string): void {
    this.change(context, 'provision.realize', state => {
      const provision = find(state.provisions, provisionId);
      const installment = find(state.installments, installmentId);
      if (provision.category !== installment.category || provision.competenceMonth !== installment.competenceMonth || provision.competenceYear !== installment.competenceYear) throw new Error('Realização deve ter a mesma categoria e competência');
      if (state.provisions.some(p => p.realizedInstallmentId === installmentId)) throw new Error('Parcela já vinculada a outra provisão');
      provision.realize(installmentId);
    });
  }
  receivablesByPeriod(month: number, year: number) {
    period(month, year);
    const base = year * 12 + month - 1;
    const groups = { past: new Money(0), current: new Money(0), next: new Money(0), secondNext: new Money(0), future: new Money(0), unassigned: new Money(0) };
    for (const receivable of this.read().receivables) {
      if (receivable.competenceMonth === undefined || receivable.competenceYear === undefined) {
        groups.unassigned = groups.unassigned.add(receivable.pendingAmount); continue;
      }
      const offset = receivable.competenceYear * 12 + receivable.competenceMonth - 1 - base;
      const key = offset < 0 ? 'past' : offset === 0 ? 'current' : offset === 1 ? 'next' : offset === 2 ? 'secondNext' : 'future';
      groups[key] = groups[key].add(receivable.pendingAmount);
    }
    return groups;
  }
}
