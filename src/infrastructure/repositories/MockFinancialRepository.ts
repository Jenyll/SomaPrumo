import { Account, Expense, ExpenseDetail, Invoice, Receivable, Investment, Budget, Transfer, Money } from '../../domain/financial';
import { ExpenseInstallment } from '../../domain/financial/ExpenseInstallment';
import { Provision } from '../../domain/financial/Provision';
import { type FinancialRepository, type FinancialState, type CommandContext, emptyFinancialState } from '../../domain/financial/FinancialRepository';
import { date, required } from '../../domain/financial/validation';

function copy(state: FinancialState): FinancialState {
  // Serialização real para exercitar o contrato JSON (datas ISO e dinheiro em centavos).
  const wire = JSON.parse(JSON.stringify(state)) as {
    [K in keyof FinancialState]: FinancialState[K] extends Array<infer T>
      ? Array<T extends { toJSON(): infer J } ? J : T> : never
  };
  return {
    accounts: wire.accounts.map(Account.fromJSON), expenses: wire.expenses.map(Expense.fromJSON),
    details: wire.details.map(ExpenseDetail.fromJSON), installments: wire.installments.map(ExpenseInstallment.fromJSON),
    invoices: wire.invoices.map(Invoice.fromJSON), receivables: wire.receivables.map(Receivable.fromJSON),
    investments: wire.investments.map(Investment.fromJSON), budgets: wire.budgets.map(Budget.fromJSON),
    transfers: wire.transfers.map(Transfer.fromJSON), provisions: wire.provisions.map(Provision.fromJSON),
    movements: wire.movements.map(m => ({ ...m, amount: Money.fromJSON(m.amount as unknown as number), date: date(m.date) })),
    receipts: wire.receipts.map(r => ({ ...r, amount: Money.fromJSON(r.amount as unknown as number), date: date(r.date) })),
    audit: wire.audit.map(a => ({ ...a, timestamp: date(a.timestamp) })),
  };
}
/** Mock volátil: sem dados pessoais, backend ou persistência entre sessões. */
export class MockFinancialRepository implements FinancialRepository {
  private state = emptyFinancialState();
  read(): FinancialState { return copy(this.state); }
  transact(context: CommandContext, action: string, change: (draft: FinancialState) => void): void {
    required(context.actorId, 'Responsável'); required(context.commandId, 'Identificador da operação'); required(action, 'Ação');
    if (this.state.audit.some(a => a.commandId === context.commandId)) throw new Error('Operação já registrada');
    const draft = this.read();
    change(draft);
    draft.audit = [...this.state.audit, { ...context, action, timestamp: new Date(), revision: this.state.audit.length + 1 }];
    // Valida a reconstrução antes de substituir o estado. Falhas não geram efeitos parciais.
    this.state = copy(draft);
  }
}
