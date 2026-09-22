import { Account, Money, AccountType } from '../../domain/financial';
import { date, positive, required, unique } from '../../domain/financial/validation';
import { AccountMovement } from '../../domain/financial/AccountMovement';
export type { AccountMovement } from '../../domain/financial/AccountMovement';
export class AccountService {
  createAccount(data: { name: string; type: AccountType; initialBalance: Money; creditLimit?: Money }): Account {
    return new Account({ ...data, id: crypto.randomUUID(), currentBalance: data.initialBalance,
      isActive: true, createdAt: new Date(), updatedAt: new Date() });
  }
  calculateBalance(account: Account, movements: AccountMovement[]): Money {
    if (account.type === AccountType.CreditCard) throw new Error('Saldo do cartão deve ser calculado pelas faturas');
    const own = movements.filter(m => m.accountId === account.id);
    unique(own.map(m => m.id));
    unique(own.map(m => m.type + ':' + m.sourceId));
    return own.reduce((balance, movement) => {
      positive(movement.amount); date(movement.date); required(movement.sourceId, 'Origem');
      switch (movement.type) {
        case 'entry': case 'transfer_in': case 'investment_redemption': case 'reimbursement':
          return balance.add(movement.amount);
        case 'expense': case 'payment': case 'transfer_out': case 'investment_buyback':
          return balance.subtract(movement.amount);
        default: throw new Error('Tipo de movimento inválido');
      }
    }, account.initialBalance);
  }
  updateBalance(account: Account, movements: AccountMovement[]): Account {
    account.setCurrentBalance(this.calculateBalance(account, movements)); return account;
  }
  deactivateAccount(account: Account): Account { account.deactivate(); return account; }
}
