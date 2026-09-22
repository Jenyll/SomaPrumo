import { Budget, Money } from '../../domain/financial';
import { ExpenseInstallment } from '../../domain/financial/ExpenseInstallment';
import { Provision } from '../../domain/financial/Provision';
import { unique } from '../../domain/financial/validation';
export class BudgetService {
  compare(budget: Budget, installments: ExpenseInstallment[], provisions: Provision[] = []) {
    unique(installments.map(p => p.id)); unique(provisions.map(p => p.id));
    const matches = (item: { category: string; competenceMonth: number; competenceYear: number }) =>
      item.category === budget.category && item.competenceMonth === budget.competenceMonth && item.competenceYear === budget.competenceYear;
    const actual = installments.filter(matches).reduce((sum, p) => sum.add(p.amount), new Money(0));
    const pending = provisions.filter(matches).reduce((sum, p) => sum.add(p.pendingAmount), new Money(0));
    budget.setActualAmount(actual);
    return { planned: budget.plannedAmount, actual, pending, difference: budget.difference,
      exceeded: budget.difference.isNegative() ? budget.difference.multiply(-1) : new Money(0),
      projected: actual.add(pending), status: budget.status };
  }
}
