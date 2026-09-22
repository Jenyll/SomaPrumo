import { Money } from '../money/Money';
import { period, required, nonnegative } from './validation';
/** Uma parcela tem competência própria e, opcionalmente, uma fatura. */
export class ExpenseInstallment {
  constructor(readonly id: string, readonly expenseId: string, readonly number: number,
    readonly amount: Money, readonly competenceMonth: number, readonly competenceYear: number,
    readonly category: string, readonly invoiceId?: string) {
    required(id, 'Parcela'); required(expenseId, 'Compra'); required(category, 'Categoria');
    period(competenceMonth, competenceYear); nonnegative(amount);
    if (!Number.isInteger(number) || number < 1) throw new Error('Parcela inválida');
  }
  toJSON() { return { ...this, amount: this.amount.toJSON() }; }
  static fromJSON(data: ReturnType<ExpenseInstallment['toJSON']>): ExpenseInstallment {
    return new ExpenseInstallment(data.id, data.expenseId, data.number, Money.fromJSON(data.amount),
      data.competenceMonth, data.competenceYear, data.category, data.invoiceId);
  }
}
