import { Money } from '../money/Money';
export interface AccountMovement {
  id: string; accountId: string; sourceId: string;
  type: 'entry' | 'expense' | 'payment' | 'transfer_out' | 'transfer_in' | 'investment_buyback' | 'investment_redemption' | 'reimbursement';
  date: Date; amount: Money; description?: string; relatedAccountId?: string;
}
