/**
 * ExpenseDetail - Divisão ou alocação de uma despesa entre pessoas
 *
 * Regra de negócio:
 * - Cada ExpenseDetail referencia uma Expense
 * - Múltiplos details podem somar o valor total da Expense
 * - Os centavos são ajustados no último detalhe para evitar arredondamento
 * - Uma pessoa pode ter multiple details da mesma compra (ex: dividida com outros)
 */

import { Money } from '../money/Money';
import { date, nonnegative, required } from './validation';

export interface ExpenseDetailProps {
  id: string;
  expenseId: string; // FK para Expense
  personId?: string; // Quem custeou ou a quem atribuir (pode ser None para "a definir")
  amount: Money; // Valor de que essa pessoa é responsável
  isPaymentOwner: boolean; // true = essa pessoa pagou; false = está dividindo com alguém
  installmentNumber?: number; // Qual parcela (relevante se Expense tem > 1)
  installmentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ExpenseDetail {
  private props: ExpenseDetailProps;

  constructor(props: ExpenseDetailProps) {
    required(props.id, 'Divisão');
    required(props.expenseId, 'Compra');
    nonnegative(props.amount);
    this.props = {
      ...props,
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get expenseId(): string {
    return this.props.expenseId;
  }

  get personId(): string | undefined {
    return this.props.personId;
  }

  get amount(): Money {
    return this.props.amount;
  }

  get isPaymentOwner(): boolean {
    return this.props.isPaymentOwner;
  }

  get installmentNumber(): number {
    return this.props.installmentNumber || 1;
  }
  get installmentId(): string | undefined { return this.props.installmentId; }

  get notes(): string | undefined {
    return this.props.notes;
  }

  /**
   * Ajusta o valor de detalhes para evitar problemas de arredondamento
   * Útil quando dividindo valores com centavos entre múltiplas pessoas
   *
   * @param details Array de ExpenseDetail da mesma Expense
   * @param totalAmount Valor total a ser distribuído
   * @returns Array atualizado com ajustes
   */
  static ensureNoRoundingErrors(
    details: ExpenseDetail[],
    totalAmount: Money,
  ): ExpenseDetail[] {
    if (details.length === 0) {
      return details;
    }

    // Soma dos valores nos detalhes
    let sum = new Money(0);
    for (const detail of details) {
      sum = sum.add(detail.amount);
    }

    // Se já está correto, retorna
    if (sum.equals(totalAmount)) {
      return details;
    }

    // Só diferenças de arredondamento são ajustáveis; não absorver valores ausentes.
    const difference = totalAmount.subtract(sum);
    if (Math.abs(difference.toJSON()) > details.length - 1) throw new Error('Divisão não corresponde ao total');
    const lastDetail = details[details.length - 1];

    const lastDetailProps: ExpenseDetailProps = {
      ...lastDetail.props,
      amount: lastDetail.amount.add(difference),
    };

    return [
      ...details.slice(0, -1),
      new ExpenseDetail(lastDetailProps),
    ];
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<ExpenseDetailProps, 'amount'> & { amount: number } {
    return {
      ...this.props,
      amount: this.props.amount.toJSON(),
    };
  }

  static fromJSON(data: Omit<ExpenseDetailProps, 'amount'> & { amount: number }): ExpenseDetail {
    return new ExpenseDetail({
      ...data,
      amount: Money.fromJSON(data.amount),
    });
  }
}
