/**
 * Account - Conta financeira (Corrente, Cartão, Carteira, Investimento, etc)
 *
 * Regra de negócio:
 * - Saldo = SaldoInicial + Entradas - Saídas + Transferências - Transferências Saída + Investimentos
 * - Não contar despesa duas vezes (já está em Invoice)
 * - Cartões de crédito têm limite
 * - Transferências entre contas próprias não geram receita/despesa consolidada
 * - Histórico de transações é rastreado em AccountTransaction
 */

import { Money } from '../money/Money';
import { AccountType } from './enums';
import { date, nonnegative, required } from './validation';

export interface AccountProps {
  id: string;
  name: string; // ex: "Conta Inter", "Nubank Card", "Carteira"
  type: AccountType;
  initialBalance: Money;
  currentBalance: Money; // Calculado, não armazenado diretamente
  creditLimit?: Money; // Para cartões
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Account {
  private props: AccountProps;

  constructor(props: AccountProps) {
    required(props.id, 'Conta');
    required(props.name, 'Nome');
    if (!Object.values(AccountType).includes(props.type)) throw new Error('Tipo de conta inválido');
    if (props.creditLimit !== undefined) nonnegative(props.creditLimit, 'Limite');
    this.props = {
      ...props,
      createdAt: date(props.createdAt),
      updatedAt: date(props.updatedAt),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): AccountType {
    return this.props.type;
  }

  get initialBalance(): Money {
    return this.props.initialBalance;
  }

  get currentBalance(): Money {
    return this.props.currentBalance;
  }

  /**
   * Atualiza saldo (deve ser chamado pelos services que calculam)
   */
  setCurrentBalance(balance: Money): void {
    this.props.currentBalance = balance;
    this.props.updatedAt = new Date();
  }

  get creditLimit(): Money | undefined {
    return this.props.creditLimit;
  }

  /**
   * Limite disponível = limite total - saldo atual
   * (Para cartões de crédito)
   */
  getAvailableCredit(): Money | undefined {
    if (!this.creditLimit) return undefined;
    return this.creditLimit.subtract(this.currentBalance);
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  /**
   * Desativa a conta (soft delete, preserva histórico)
   */
  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  /**
   * Retorna representação para persistência
   */
  toJSON(): Omit<AccountProps, 'initialBalance' | 'currentBalance' | 'creditLimit'> & {
    initialBalance: number;
    currentBalance: number;
    creditLimit?: number;
  } {
    return {
      ...this.props,
      initialBalance: this.props.initialBalance.toJSON(),
      currentBalance: this.props.currentBalance.toJSON(),
      creditLimit: this.props.creditLimit?.toJSON(),
    };
  }

  static fromJSON(
    data: Omit<AccountProps, 'initialBalance' | 'currentBalance' | 'creditLimit'> & {
      initialBalance: number;
      currentBalance: number;
      creditLimit?: number;
    },
  ): Account {
    return new Account({
      ...data,
      initialBalance: Money.fromJSON(data.initialBalance),
      currentBalance: Money.fromJSON(data.currentBalance),
      creditLimit: data.creditLimit !== undefined ? Money.fromJSON(data.creditLimit) : undefined,
    });
  }
}
