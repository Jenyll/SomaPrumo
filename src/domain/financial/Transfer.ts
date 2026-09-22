/**
 * Transfer - Transferência de valores entre contas ou para investimentos
 *
 * Regra de negócio:
 * - Transferência entre contas próprias: afeta ambas, não gera receita/despesa
 * - Transferência para investimento (aporte): sai caixa, entra investimento
 * - Resgate de investimento: sai investimento, entra caixa
 */

import { Money } from '../money/Money';
import { TransferType } from './enums';
import { date, positive, required } from './validation';

export interface TransferProps {
  id: string;
  type: TransferType;
  date: Date;
  amount: Money;

  // Para transferências entre contas
  sourceAccountId?: string;
  destinationAccountId?: string;

  // Para transferências com investimento
  investmentId?: string;

  // Para transferências com terceiros
  thirdPartyPersonId?: string;

  description?: string;
  reference?: string; // Número de operação, chave Pix, etc
  isConfirmed: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Transfer {
  private props: TransferProps;

  constructor(props: TransferProps) {
    required(props.id, 'Transferência');
    positive(props.amount);
    if (!Object.values(TransferType).includes(props.type)) throw new Error('Tipo de transferência inválido');
    this.props = {
      ...props,
      date: date(props.date),
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
    this.validate();
  }

  private validate(): void {
    const { type, sourceAccountId, destinationAccountId, investmentId, thirdPartyPersonId } = this.props;

    switch (type) {
      case TransferType.BetweenAccounts:
        if (!sourceAccountId || !destinationAccountId) {
          throw new Error('Transfer: BetweenAccounts requer sourceAccountId e destinationAccountId');
        }
        if (sourceAccountId === destinationAccountId) throw new Error('Contas de origem e destino devem ser diferentes');
        if (investmentId || thirdPartyPersonId) throw new Error('Transferência interna não aceita investimento ou terceiro');
        break;

      case TransferType.FromThirdParty:
        if (!destinationAccountId || !thirdPartyPersonId) {
          throw new Error('Transfer: FromThirdParty requer destinationAccountId e thirdPartyPersonId');
        }
        break;

      case TransferType.ToThirdParty:
        if (!sourceAccountId || !thirdPartyPersonId) {
          throw new Error('Transfer: ToThirdParty requer sourceAccountId e thirdPartyPersonId');
        }
        break;
    }
  }

  get id(): string {
    return this.props.id;
  }

  get type(): TransferType {
    return this.props.type;
  }

  get date(): Date {
    return this.props.date;
  }

  get amount(): Money {
    return this.props.amount;
  }

  get sourceAccountId(): string | undefined {
    return this.props.sourceAccountId;
  }

  get destinationAccountId(): string | undefined {
    return this.props.destinationAccountId;
  }

  get investmentId(): string | undefined {
    return this.props.investmentId;
  }

  get thirdPartyPersonId(): string | undefined {
    return this.props.thirdPartyPersonId;
  }

  get isConfirmed(): boolean {
    return this.props.isConfirmed;
  }

  /**
   * Confirma a transferência
   */
  confirm(): void {
    this.props.isConfirmed = true;
    this.props.updatedAt = new Date();
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<TransferProps, 'amount'> & { amount: number } {
    return {
      ...this.props,
      amount: this.props.amount.toJSON(),
    };
  }

  static fromJSON(data: Omit<TransferProps, 'amount'> & { amount: number }): Transfer {
    return new Transfer({
      ...data,
      amount: Money.fromJSON(data.amount),
    });
  }
}
