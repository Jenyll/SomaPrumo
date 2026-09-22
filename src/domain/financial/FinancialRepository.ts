import { Account, Expense, ExpenseDetail, Invoice, Receivable, Investment, Budget, Transfer } from './index';
import { ExpenseInstallment } from './ExpenseInstallment';
import { Provision } from './Provision';
import { AccountMovement } from './AccountMovement';
import { Money } from '../money/Money';
export interface Receipt {
  id: string; receivableId: string; accountId: string; amount: Money; date: Date;
  invoiceId?: string; competenceMonth?: number; competenceYear?: number;
}
export interface AuditRecord {
  commandId: string; actorId: string; action: string; timestamp: Date; revision: number;
}
export interface CommandContext { commandId: string; actorId: string; }
export interface FinancialState {
  accounts: Account[]; expenses: Expense[]; installments: ExpenseInstallment[];
  details: ExpenseDetail[]; invoices: Invoice[]; receivables: Receivable[];
  receipts: Receipt[]; investments: Investment[]; budgets: Budget[]; provisions: Provision[];
  transfers: Transfer[]; movements: AccountMovement[]; audit: AuditRecord[];
}
export function emptyFinancialState(): FinancialState {
  return { accounts: [], expenses: [], installments: [], details: [], invoices: [], receivables: [],
    receipts: [], investments: [], budgets: [], provisions: [], transfers: [], movements: [], audit: [] };
}
/** Unidade de trabalho: grava todas as mudanças e a auditoria ou não grava nenhuma. */
export interface FinancialRepository {
  read(): FinancialState;
  transact(context: CommandContext, action: string, change: (draft: FinancialState) => void): void;
}
