import { Expense, ExpenseDetail, Money } from '../../domain/financial';
import { ExpenseInstallment } from '../../domain/financial/ExpenseInstallment';
import { nonnegative, period, required, unique } from '../../domain/financial/validation';
export interface SplitPerson { personId: string; amount?: Money; isPaymentOwner?: boolean; }
export class ExpenseService {
  createExpense(data: {
    purchaseNumber: number; date: Date; amount: Money; category: string; group?: string;
    description?: string; installments?: number; merchant?: string; invoiceMonth?: string;
  }): Expense {
    return new Expense({ ...data, id: crypto.randomUUID(), isOwn: true, installments: data.installments ?? 1,
      createdAt: new Date(), updatedAt: new Date() });
  }
  splitExpense(expense: Expense, people: SplitPerson[]): ExpenseDetail[] {
    if (!people.length) throw new Error('Informe ao menos uma pessoa');
    unique(people.map(p => p.personId));
    const hasCustom = people.some(p => p.amount !== undefined);
    if (hasCustom && people.some(p => p.amount === undefined)) throw new Error('Informe todos os valores da divisão personalizada');
    const amounts = hasCustom ? people.map(p => p.amount!) : expense.amount.divideEvenly(people.length);
    amounts.forEach(amount => nonnegative(amount));
    if (!amounts.reduce((sum, amount) => sum.add(amount), new Money(0)).equals(expense.amount)) throw new Error('Divisão não corresponde ao total');
    const owners = people.filter(p => p.isPaymentOwner === true).length;
    if (owners > 1) throw new Error('Informe apenas um responsável pelo pagamento');
    // O padrão do primeiro participante só vale quando nenhum responsável foi explicitado.
    const ownerIndex = owners === 1 ? people.findIndex(p => p.isPaymentOwner) : people.findIndex(p => p.isPaymentOwner !== false);
    if (ownerIndex < 0) throw new Error('Informe o responsável pelo pagamento');
    return people.map((person, i) => new ExpenseDetail({ id: crypto.randomUUID(), expenseId: expense.id,
      personId: person.personId, amount: amounts[i], isPaymentOwner: i === ownerIndex,
      createdAt: new Date(), updatedAt: new Date() }));
  }
  schedule(expense: Expense, firstMonth: number, firstYear: number): ExpenseInstallment[] {
    period(firstMonth, firstYear);
    return expense.amount.divideEvenly(expense.installments).map((amount, i) => {
      const index = firstYear * 12 + firstMonth - 1 + i;
      return new ExpenseInstallment(expense.id + ':' + (i + 1), expense.id, i + 1, amount,
        index % 12 + 1, Math.floor(index / 12), expense.category);
    });
  }
  linkExpenseToInvoice(expense: Expense, invoiceId: string, invoiceMonth: string): Expense {
    required(invoiceId, 'Fatura'); expense.linkToInvoice(invoiceId, invoiceMonth); return expense;
  }
}
