/**
 * Investment - Investimento de Renda Fixa
 *
 * Regra de negócio:
 * - Renda fixa com movimentos registrados; sem cotações ou projeções
 * - Saldo = SUM(Aportes - Resgates - Taxas + Rendimentos)
 * - Movimentos são registrados separadamente (aporte, resgate, taxa, rendimento)
 * - Tipos de movimento têm sinais explícitos (não confiar em negativo)
 */

import { Money } from '../money/Money';
import { InvestmentMovementType } from './enums';
import { date, positive, required, unique } from './validation';

export interface InvestmentMovementProps {
  id: string;
  investmentId: string;
  type: InvestmentMovementType;
  date: Date;
  amount: Money;
  description?: string;
  reference?: string; // Número de operação
  notes?: string;
  createdAt: Date;
}

export class InvestmentMovement {
  constructor(private props: InvestmentMovementProps) {
    required(props.id, 'Movimento');
    required(props.investmentId, 'Investimento');
    positive(props.amount);
    if (!Object.values(InvestmentMovementType).includes(props.type)) throw new Error('Tipo de movimento inválido');
    this.props = { ...props, date: date(props.date), createdAt: date(props.createdAt) };
  }

  get id(): string {
    return this.props.id;
  }

  get investmentId(): string {
    return this.props.investmentId;
  }

  get type(): InvestmentMovementType {
    return this.props.type;
  }

  get date(): Date {
    return this.props.date;
  }

  get amount(): Money {
    return this.props.amount;
  }

  /**
   * Sinal do movimento para cálculo de saldo
   */
  getSignedAmount(): Money {
    switch (this.type) {
      case InvestmentMovementType.Buyback: // Aporte: soma
        return this.amount;
      case InvestmentMovementType.Redemption: // Resgate: subtrai
        return new Money(-this.amount.amount);
      case InvestmentMovementType.Fee: // Taxa: subtrai
        return new Money(-this.amount.amount);
      case InvestmentMovementType.Yield: // Rendimento: soma
        return this.amount;
    }
  }

  toJSON(): Omit<InvestmentMovementProps, 'amount'> & { amount: number } {
    return {
      ...this.props,
      amount: this.props.amount.toJSON(),
    };
  }

  static fromJSON(data: Omit<InvestmentMovementProps, 'amount'> & { amount: number }): InvestmentMovement {
    return new InvestmentMovement({
      ...data,
      amount: Money.fromJSON(data.amount),
    });
  }
}

export interface InvestmentProps {
  id: string;
  name: string; // Nome definido pelo usuário
  bank?: string; // ex: "Nubank", "Inter"
  detail?: string; // ex: "CDB à 10% a.a."
  isActive: boolean;
  currentBalance: Money;
  movements: InvestmentMovement[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Investment {
  private props: InvestmentProps;

  constructor(props: InvestmentProps) {
    required(props.id, 'Investimento');
    required(props.name, 'Nome');
    unique(props.movements.map(m => m.id));
    if (props.movements.some(m => m.investmentId !== props.id)) throw new Error('Movimento pertence a outro investimento');
    this.props = {
      ...props,
      movements: [...props.movements],
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
    this.recalculateBalance();
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get bank(): string | undefined {
    return this.props.bank;
  }

  get detail(): string | undefined {
    return this.props.detail;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get currentBalance(): Money {
    return this.props.currentBalance;
  }

  get movements(): InvestmentMovement[] {
    return [...this.props.movements];
  }

  /**
   * Registra um movimento (aporte, resgate, taxa, rendimento)
   */
  addMovement(movement: InvestmentMovement): void {
    if (!this.isActive) throw new Error('Investimento inativo');
    if (movement.investmentId !== this.id) throw new Error('Movimento pertence a outro investimento');
    if (this.props.movements.some(m => m.id === movement.id)) throw new Error('Movimento duplicado');
    if (movement.type === InvestmentMovementType.Redemption && movement.amount.toJSON() > this.currentBalance.toJSON()) throw new Error('Resgate excede o saldo');
    this.props.movements.push(movement);
    this.recalculateBalance();
    this.props.updatedAt = new Date();
  }

  /**
   * Recalcula saldo a partir dos movimentos
   */
  private recalculateBalance(): void {
    let balance = new Money(0);
    for (const movement of this.props.movements) {
      balance = balance.add(movement.getSignedAmount());
    }
    this.props.currentBalance = balance;
  }

  /**
   * Desativa o investimento
   */
  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<InvestmentProps, 'currentBalance' | 'movements'> & {
    currentBalance: number;
    movements: ReturnType<InvestmentMovement['toJSON']>[];
  } {
    return {
      ...this.props,
      currentBalance: this.props.currentBalance.toJSON(),
      movements: this.props.movements.map((m) => m.toJSON()),
    };
  }

  static fromJSON(
    data: Omit<InvestmentProps, 'currentBalance' | 'movements'> & {
      currentBalance: number;
      movements: ReturnType<InvestmentMovement['toJSON']>[];
    },
  ): Investment {
    return new Investment({
      ...data,
      currentBalance: Money.fromJSON(data.currentBalance),
      movements: data.movements.map((m) => InvestmentMovement.fromJSON(m)),
    });
  }
}
