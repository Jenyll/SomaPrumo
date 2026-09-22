/**
 * Budget - Orçamento por categoria e mês
 *
 * Regra de negócio:
 * - Planejado vs Realizado por categoria + competência
 * - Status: OnTrack ou Exceeded; AtRisk reservado
 * - Diferença negativa mostra quanto foi excedido (não zera)
 * - Provisões devem ser vinculadas a realizações para evitar duplicidade
 */

import { Money } from '../money/Money';
import { BudgetStatus } from './enums';
import { date, nonnegative, period, required } from './validation';

export interface BudgetProps {
  id: string;
  category: string;
  competenceMonth: number; // 1-12
  competenceYear: number;
  plannedAmount: Money;
  actualAmount: Money; // Apenas despesas realizadas; provisões pendentes são separadas.
  status: BudgetStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Budget {
  private props: BudgetProps;

  constructor(props: BudgetProps) {
    required(props.id, 'Orçamento');
    required(props.category, 'Categoria');
    period(props.competenceMonth, props.competenceYear);
    nonnegative(props.plannedAmount);
    nonnegative(props.actualAmount);
    this.props = {
      ...props,
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
    this.updateStatus();
  }

  get id(): string {
    return this.props.id;
  }

  get category(): string {
    return this.props.category;
  }

  get competenceMonth(): number {
    return this.props.competenceMonth;
  }

  get competenceYear(): number {
    return this.props.competenceYear;
  }

  get plannedAmount(): Money {
    return this.props.plannedAmount;
  }

  get actualAmount(): Money {
    return this.props.actualAmount;
  }

  /**
   * Diferença = Planned - Actual
   * Positivo = economizado, Negativo = excedido
   */
  get difference(): Money {
    return this.plannedAmount.subtract(this.actualAmount);
  }

  get status(): BudgetStatus {
    return this.props.status;
  }

  /**
   * Atualiza o valor realizado
   */
  setActualAmount(amount: Money): void {
    nonnegative(amount);
    this.props.actualAmount = amount;
    this.updateStatus();
    this.props.updatedAt = new Date();
  }

  /**
   * Atualiza status baseado em diferença
   */
  private updateStatus(): void {
    const diff = this.difference;

    if (diff.isNegative()) {
      // Excedido: gasto mais que planejado
      this.props.status = BudgetStatus.Exceeded;
    } else if (diff.isPositive()) {
      this.props.status = BudgetStatus.OnTrack;
    } else {
      // Exatamente igual
      this.props.status = BudgetStatus.OnTrack;
    }
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<BudgetProps, 'plannedAmount' | 'actualAmount'> & {
    plannedAmount: number;
    actualAmount: number;
  } {
    return {
      ...this.props,
      plannedAmount: this.props.plannedAmount.toJSON(),
      actualAmount: this.props.actualAmount.toJSON(),
    };
  }

  static fromJSON(
    data: Omit<BudgetProps, 'plannedAmount' | 'actualAmount'> & {
      plannedAmount: number;
      actualAmount: number;
    },
  ): Budget {
    return new Budget({
      ...data,
      plannedAmount: Money.fromJSON(data.plannedAmount),
      actualAmount: Money.fromJSON(data.actualAmount),
    });
  }
}
