import { Money } from '../money/Money';
import { positive, period, required } from './validation';
export interface ProvisionProps {
  id: string; category: string; competenceMonth: number; competenceYear: number;
  amount: Money; isActive: boolean; realizedInstallmentId?: string;
}
export class Provision {
  private props: ProvisionProps;
  constructor(props: ProvisionProps) {
    required(props.id, 'Provisão'); required(props.category, 'Categoria');
    period(props.competenceMonth, props.competenceYear); positive(props.amount);
    this.props = { ...props };
  }
  get id() { return this.props.id; }
  get category() { return this.props.category; }
  get competenceMonth() { return this.props.competenceMonth; }
  get competenceYear() { return this.props.competenceYear; }
  get amount() { return this.props.amount; }
  get isActive() { return this.props.isActive; }
  get realizedInstallmentId() { return this.props.realizedInstallmentId; }
  get pendingAmount() { return this.props.realizedInstallmentId || !this.isActive ? new Money(0) : this.amount; }
  realize(installmentId: string): void {
    required(installmentId, 'Parcela realizada');
    if (!this.isActive || this.realizedInstallmentId) throw new Error('Provisão inativa ou já realizada');
    this.props.realizedInstallmentId = installmentId;
  }
  deactivate() { this.props.isActive = false; }
  toJSON() { return { ...this.props, amount: this.amount.toJSON() }; }
  static fromJSON(data: ReturnType<Provision['toJSON']>) { return new Provision({ ...data, amount: Money.fromJSON(data.amount) }); }
}
