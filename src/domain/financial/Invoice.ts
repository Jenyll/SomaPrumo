/**
 * Invoice - Fatura de cartão ou conta
 *
 * Regra de negócio:
 * - Uma fatura agrupa despesas de um período (mês) + cartão
 * - Valor = soma das parcelas vinculadas à fatura
 * - Pagamentos são independentes (podem ser parciais)
 * - Valores a receber de terceiros são separados (pessoas que dividiram)
 * - Status financeiro: Open, PartiallyPaid ou Paid; fechamento é independente
 * - Fechamento NÃO zera valores a receber (apenas marca fatura como concluída)
 */

import { Money } from '../money/Money';
import { InvoiceStatus } from './enums';
import { date, nonnegative, period, positive, required, unique } from './validation';

export interface InvoicePaymentProps {
  id: string;
  invoiceId: string;
  date: Date;
  amount: Money;
  accountId: string; // De qual conta foi pago
  notes?: string;
  createdAt: Date;
}

export class InvoicePayment {
  constructor(private props: InvoicePaymentProps) {
    required(props.id, 'Pagamento');
    required(props.invoiceId, 'Fatura');
    required(props.accountId, 'Conta');
    positive(props.amount);
    this.props = { ...props, date: date(props.date), createdAt: date(props.createdAt) };
  }

  get id(): string {
    return this.props.id;
  }

  get invoiceId(): string {
    return this.props.invoiceId;
  }

  get date(): Date {
    return this.props.date;
  }

  get amount(): Money {
    return this.props.amount;
  }

  get accountId(): string {
    return this.props.accountId;
  }

  toJSON(): Omit<InvoicePaymentProps, 'amount'> & { amount: number } {
    return {
      ...this.props,
      amount: this.props.amount.toJSON(),
    };
  }

  static fromJSON(data: Omit<InvoicePaymentProps, 'amount'> & { amount: number }): InvoicePayment {
    return new InvoicePayment({
      ...data,
      amount: Money.fromJSON(data.amount),
    });
  }
}

export interface InvoiceProps {
  id: string;
  cardAccountId: string; // FK para Account (qual cartão/conta gerou)
  competenceMonth: number; // 1-12
  competenceYear: number; // ex: 2026
  totalExpenses: Money; // Soma das parcelas
  totalPaid: Money; // SUM de InvoicePayment
  status: InvoiceStatus;
  payments: InvoicePayment[];
  receivablesFromThirdParties: Money; // Valores a receber de quem dividiu
  isClosed: boolean; // Fatura foi "fechada" (administrativo)
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Invoice {
  private props: InvoiceProps;

  constructor(props: InvoiceProps) {
    required(props.id, 'Fatura');
    required(props.cardAccountId, 'Cartão');
    period(props.competenceMonth, props.competenceYear);
    nonnegative(props.totalExpenses);
    nonnegative(props.receivablesFromThirdParties);
    unique(props.payments.map(p => p.id));
    if (props.payments.some(p => p.invoiceId !== props.id)) throw new Error('Pagamento pertence a outra fatura');
    this.props = {
      ...props,
      payments: [...props.payments],
      totalPaid: props.payments.reduce((sum, payment) => sum.add(payment.amount), new Money(0)),
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
    if (this.balance.isNegative()) throw new Error('Pagamentos excedem a fatura');
    this.updateStatus();
  }

  get id(): string {
    return this.props.id;
  }

  get cardAccountId(): string {
    return this.props.cardAccountId;
  }

  get competenceMonth(): number {
    return this.props.competenceMonth;
  }

  get competenceYear(): number {
    return this.props.competenceYear;
  }

  get competenceLabel(): string {
    const monthName = new Date(this.competenceYear, this.competenceMonth - 1, 1)
      .toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
    return monthName;
  }

  get totalExpenses(): Money {
    return this.props.totalExpenses;
  }

  get totalPaid(): Money {
    return this.props.totalPaid;
  }

  /**
   * Saldo em aberto = Despesas - Pagamentos
   */
  get balance(): Money {
    return this.totalExpenses.subtract(this.totalPaid);
  }

  get status(): InvoiceStatus {
    return this.props.status;
  }

  get payments(): InvoicePayment[] {
    return [...this.props.payments];
  }

  get receivablesFromThirdParties(): Money {
    return this.props.receivablesFromThirdParties;
  }

  get isClosed(): boolean {
    return this.props.isClosed;
  }

  /**
   * Registra um pagamento
   * Atualiza status automaticamente
   */
  addPayment(payment: InvoicePayment): void {
    if (payment.invoiceId !== this.id) throw new Error('Pagamento pertence a outra fatura');
    if (this.props.payments.some(p => p.id === payment.id)) throw new Error('Pagamento duplicado');
    if (payment.amount.toJSON() > this.balance.toJSON()) throw new Error('Pagamento excede o saldo em aberto');
    this.props.payments.push(payment);
    this.props.totalPaid = this.props.totalPaid.add(payment.amount);
    this.updateStatus();
    this.props.updatedAt = new Date();
  }

  /**
   * Atualiza status baseado em valores
   */
  private updateStatus(): void {
    const balance = this.balance;

    if (balance.isZero() && this.totalExpenses.isPositive()) {
      this.props.status = InvoiceStatus.Paid;
    } else if (this.props.totalPaid.isPositive() && !balance.isZero()) {
      this.props.status = InvoiceStatus.PartiallyPaid;
    } else {
      this.props.status = InvoiceStatus.Open;
    }
  }

  /**
   * Fecha a fatura administrativamente
   * O "Fechar" NÃO afeta valores a receber de terceiros
   * É apenas uma marcação de que a fatura foi processada
   */
  close(): void {
    this.props.isClosed = true;
    this.props.updatedAt = new Date();
  }

  setTotalExpenses(amount: Money): void {
    nonnegative(amount);
    if (this.isClosed) throw new Error('Fatura fechada não aceita alteração de despesas');
    if (amount.toJSON() < this.totalPaid.toJSON()) throw new Error('Total menor que pagamentos registrados');
    this.props.totalExpenses = amount;
    this.updateStatus();
    this.props.updatedAt = new Date();
  }

  setReceivablesFromThirdParties(amount: Money): void {
    nonnegative(amount);
    this.props.receivablesFromThirdParties = amount;
    this.props.updatedAt = new Date();
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<InvoiceProps, 'totalExpenses' | 'totalPaid' | 'receivablesFromThirdParties' | 'payments'> & {
    totalExpenses: number;
    totalPaid: number;
    receivablesFromThirdParties: number;
    payments: ReturnType<InvoicePayment['toJSON']>[];
  } {
    return {
      ...this.props,
      totalExpenses: this.props.totalExpenses.toJSON(),
      totalPaid: this.props.totalPaid.toJSON(),
      receivablesFromThirdParties: this.props.receivablesFromThirdParties.toJSON(),
      payments: this.props.payments.map((p) => p.toJSON()),
    };
  }

  static fromJSON(
    data: Omit<InvoiceProps, 'totalExpenses' | 'totalPaid' | 'receivablesFromThirdParties' | 'payments'> & {
      totalExpenses: number;
      totalPaid: number;
      receivablesFromThirdParties: number;
      payments: ReturnType<InvoicePayment['toJSON']>[];
    },
  ): Invoice {
    return new Invoice({
      ...data,
      totalExpenses: Money.fromJSON(data.totalExpenses),
      totalPaid: Money.fromJSON(data.totalPaid),
      receivablesFromThirdParties: Money.fromJSON(data.receivablesFromThirdParties),
      payments: data.payments.map((p) => InvoicePayment.fromJSON(p)),
    });
  }
}
