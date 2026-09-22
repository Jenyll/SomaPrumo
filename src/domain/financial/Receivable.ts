/**
 * Receivable - Valores a receber de terceiros
 *
 * Regra de negócio:
 * - Quando uma pessoa compra e divide com outros, os outros ficam devendo
 * - Cada valor a receber é rastreado independentemente
 * - Status: Pending (não recebido) -> PartiallyReceived (parte) -> Received (tudo) -> WrittenOff (baixado)
 * - "Baixar" é diferente de "fechar fatura" - é uma decisão consciente de não receber
 * - Recibos/comprovantes podem ser anexados
 * - Deve vincular à origem (qual Expense gerou esse débito)
 */

import { Money } from '../money/Money';
import { ReceivableStatus } from './enums';
import { date, nonnegative, period, positive, required } from './validation';

export interface ReceivableProps {
  id: string;
  debtorPersonId: string; // Quem deve
  creditorPersonId: string; // Quem vai receber (owner)
  expenseDetailId: string; // FK para ExpenseDetail (origem)
  invoiceId?: string;
  competenceMonth?: number;
  competenceYear?: number;
  originalAmount: Money; // Quanto foi dividido
  receivedAmount: Money; // Quanto já recebeu
  status: ReceivableStatus;
  dueDate?: Date; // Data até quando esperar receber
  writtenOffDate?: Date; // Data em que foi baixado (se aplicável)
  writtenOffReason?: string; // Por quê não vai receber?
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Receivable {
  private props: ReceivableProps;

  constructor(props: ReceivableProps) {
    required(props.id, 'Valor a receber');
    required(props.debtorPersonId, 'Devedor');
    required(props.creditorPersonId, 'Credor');
    required(props.expenseDetailId, 'Origem');
    positive(props.originalAmount);
    if (props.competenceMonth !== undefined || props.competenceYear !== undefined) period(props.competenceMonth!, props.competenceYear!);
    nonnegative(props.receivedAmount);
    if (props.debtorPersonId === props.creditorPersonId) throw new Error('Devedor e credor devem ser diferentes');
    if (props.receivedAmount.toJSON() > props.originalAmount.toJSON()) throw new Error('Recebimento excede o original');
    if (props.status === ReceivableStatus.WrittenOff) {
      required(props.writtenOffReason ?? '', 'Motivo da baixa');
      if (!props.writtenOffDate) throw new Error('Data da baixa obrigatória');
    }
    this.props = {
      ...props,
      dueDate: props.dueDate ? date(props.dueDate) : undefined,
      writtenOffDate: props.writtenOffDate ? date(props.writtenOffDate) : undefined,
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
    if (props.status !== ReceivableStatus.WrittenOff) this.updateStatus();
  }

  get id(): string {
    return this.props.id;
  }

  get debtorPersonId(): string {
    return this.props.debtorPersonId;
  }

  get creditorPersonId(): string {
    return this.props.creditorPersonId;
  }

  get expenseDetailId(): string {
    return this.props.expenseDetailId;
  }
  get invoiceId(): string | undefined { return this.props.invoiceId; }
  get competenceMonth(): number | undefined { return this.props.competenceMonth; }
  get competenceYear(): number | undefined { return this.props.competenceYear; }

  get originalAmount(): Money {
    return this.props.originalAmount;
  }

  get receivedAmount(): Money {
    return this.props.receivedAmount;
  }

  /**
   * Quanto ainda falta receber
   */
  get pendingAmount(): Money {
    if (this.status === ReceivableStatus.WrittenOff) return new Money(0);
    return this.originalAmount.subtract(this.receivedAmount);
  }

  get writtenOffAmount(): Money {
    return this.status === ReceivableStatus.WrittenOff ? this.originalAmount.subtract(this.receivedAmount) : new Money(0);
  }
  get writtenOffReason(): string | undefined { return this.props.writtenOffReason; }
  get writtenOffDate(): Date | undefined { return this.props.writtenOffDate ? new Date(this.props.writtenOffDate) : undefined; }

  get status(): ReceivableStatus {
    return this.props.status;
  }

  get dueDate(): Date | undefined {
    return this.props.dueDate;
  }

  get isOverdue(): boolean {
    if (!this.dueDate) return false;
    if (this.status === ReceivableStatus.Received || this.status === ReceivableStatus.WrittenOff) {
      return false;
    }
    return new Date() > this.dueDate;
  }

  /**
   * Registra recebimento (pode ser parcial)
   */
  registerReceipt(amount: Money): void {
    positive(amount);
    if (this.status === ReceivableStatus.WrittenOff) throw new Error('Valor já baixado');
    const newReceived = this.receivedAmount.add(amount);

    // Validar que não excede original
    if (newReceived.amount > this.originalAmount.amount) {
      throw new Error(
        `Receivable.registerReceipt: amount recebido (${newReceived.formatted}) ` +
        `não pode exceder original (${this.originalAmount.formatted})`,
      );
    }

    this.props.receivedAmount = newReceived;
    this.updateStatus();
    this.props.updatedAt = new Date();
  }

  /**
   * Marca como baixado (decisão consciente de não receber)
   */
  writeOff(reason: string): void {
    required(reason, 'Motivo da baixa');
    if (!this.pendingAmount.isPositive()) throw new Error('Não há saldo para baixar');
    this.props.status = ReceivableStatus.WrittenOff;
    this.props.writtenOffDate = new Date();
    this.props.writtenOffReason = reason;
    this.props.updatedAt = new Date();
  }

  /**
   * Atualiza status baseado em valores
   */
  private updateStatus(): void {
    if (this.receivedAmount.equals(this.originalAmount)) {
      this.props.status = ReceivableStatus.Received;
    } else if (this.receivedAmount.isPositive()) {
      this.props.status = ReceivableStatus.PartiallyReceived;
    } else {
      this.props.status = ReceivableStatus.Pending;
    }
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<ReceivableProps, 'originalAmount' | 'receivedAmount'> & {
    originalAmount: number;
    receivedAmount: number;
  } {
    return {
      ...this.props,
      originalAmount: this.props.originalAmount.toJSON(),
      receivedAmount: this.props.receivedAmount.toJSON(),
    };
  }

  static fromJSON(
    data: Omit<ReceivableProps, 'originalAmount' | 'receivedAmount'> & {
      originalAmount: number;
      receivedAmount: number;
    },
  ): Receivable {
    return new Receivable({
      ...data,
      originalAmount: Money.fromJSON(data.originalAmount),
      receivedAmount: Money.fromJSON(data.receivedAmount),
    });
  }
}
