/**
 * Expense - Entidade para representar uma compra/despesa
 *
 * Regra de negócio:
 * - Uma compra pode ser parcela de um valor maior
 * - Uma compra pode ser compartilhada entre pessoas
 * - O valor total da compra NÃO é duplicado quando compartilhado
 * - Cada divisão é rastreada em ExpenseDetail
 * - Data da compra ≠ competência da fatura ≠ data do pagamento
 */

import { Money } from '../money/Money';
import { date, positive, required } from './validation';

export interface ExpenseProps {
  id: string;
  purchaseNumber: number; // Número sequencial da compra
  date: Date; // Data da compra
  amount: Money; // Valor total da compra
  category: string; // Categoria (ex: "Alimentação", "Transporte")
  group?: string; // Agrupador (ex: "Pessoal", "Negócio")
  description?: string;
  isOwn: boolean; // true = própria, false = apenas acompanhamento de divisão
  installments?: number; // Número de parcelas (1 = sem parcelamento)
  invoiceMonth?: string; // Competência da fatura (ex: "out.2026")
  invoiceId?: string; // FK para Invoice (fatura em que apareceu)
  paymentMethod?: string; // Como foi pago (Cartão, Dinheiro, etc)
  merchant?: string; // Estabelecimento
  tags?: string[]; // Rótulos customizados
  createdAt: Date;
  updatedAt: Date;
}

export class Expense {
  private props: ExpenseProps;

  constructor(props: ExpenseProps) {
    required(props.id, 'Compra');
    required(props.category, 'Categoria');
    positive(props.amount);
    if (!Number.isSafeInteger(props.purchaseNumber) || props.purchaseNumber < 1) throw new Error('Número da compra inválido');
    if (!Number.isInteger(props.installments ?? 1) || (props.installments ?? 1) < 1 || (props.installments ?? 1) > 1200) throw new Error('Parcelas inválidas');
    this.props = {
      ...props,
      date: date(props.date),
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get purchaseNumber(): number {
    return this.props.purchaseNumber;
  }

  get date(): Date {
    return new Date(this.props.date);
  }

  get amount(): Money {
    return this.props.amount;
  }

  get category(): string {
    return this.props.category;
  }

  get group(): string | undefined {
    return this.props.group;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get isOwn(): boolean {
    return this.props.isOwn;
  }

  get installments(): number {
    return this.props.installments || 1;
  }

  get invoiceMonth(): string | undefined {
    return this.props.invoiceMonth;
  }

  get invoiceId(): string | undefined {
    return this.props.invoiceId;
  }

  /**
   * Valor exato da parcela, com o ajuste de centavos na última
   */
  getAmountPerInstallment(number = 1): Money {
    if (!Number.isInteger(number) || number < 1 || number > this.installments) throw new Error('Parcela inválida');
    return this.amount.divideEvenly(this.installments)[number - 1];
  }

  /**
   * Marca como vinculada a uma fatura
   */
  linkToInvoice(invoiceId: string, invoiceMonth: string): void {
    required(invoiceId, 'Fatura');
    required(invoiceMonth, 'Competência');
    if (this.installments > 1) throw new Error('Vincule cada parcela à sua fatura');
    this.props.invoiceId = invoiceId;
    this.props.invoiceMonth = invoiceMonth;
    this.props.updatedAt = new Date();
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<ExpenseProps, 'amount'> & { amount: number } {
    return {
      ...this.props,
      amount: this.props.amount.toJSON(),
    };
  }

  static fromJSON(data: Omit<ExpenseProps, 'amount'> & { amount: number }): Expense {
    return new Expense({
      ...data,
      amount: Money.fromJSON(data.amount),
    });
  }
}
