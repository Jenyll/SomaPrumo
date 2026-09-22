import { describe, it, expect } from 'vitest';
import { Money, Account, AccountType, Invoice, InvoiceStatus } from '../../src/domain/financial';
import { date } from '../../src/domain/financial/validation';
describe('Fronteiras financeiras', () => {
  it.each(['', '10abc', '50.000,00', '1,23', Infinity, NaN, null, undefined])('rejeita valor incompleto ou ambíguo %s', value => {
    expect(() => new Money(value as number)).toThrow();
  });
  it.each([1.005, -1.005, 2.675, -2.675])('arredonda decimal %s sem erro binário', value => {
    expect(new Money(value).toJSON()).toBe(({ '1.005': 101, '-1.005': -101, '2.675': 268, '-2.675': -268 } as Record<string, number>)[String(value)]);
  });
  it('divide valores negativos preservando os centavos', () => {
    expect(new Money(-100).divideEvenly(3).map(m => m.amount)).toEqual([-33.33, -33.33, -33.34]);
    expect(() => new Money(100).divideEvenly(2.5)).toThrow();
    expect(() => Money.fromCents(1.2)).toThrow();
    expect(() => Money.fromCents(Number.MAX_SAFE_INTEGER).add(Money.fromCents(1))).toThrow();
  });
  it('preserva zero em limite e restaura datas ao ler JSON', () => {
    const now = new Date();
    const original = new Account({ id: 'c', name: 'Teste', type: AccountType.CreditCard, initialBalance: new Money(0),
      currentBalance: new Money(0), creditLimit: new Money(0), isActive: true, createdAt: now, updatedAt: now });
    const restored = Account.fromJSON(JSON.parse(JSON.stringify(original)));
    expect(restored.creditLimit?.toJSON()).toBe(0);
    expect(restored.toJSON().createdAt).toBeInstanceOf(Date);
  });
  it('valida datas do calendário e anos bissextos', () => {
    expect(() => date('2026-02-30')).toThrow();
    expect(() => date('2026-02-29')).toThrow();
    expect(date('2028-02-29').getUTCDate()).toBe(29);
    expect(() => date('Conta de teste')).toThrow();
  });
  it('recalcula totais derivados ao restaurar uma fatura', () => {
    const invoice = new Invoice({ id: 'i', cardAccountId: 'c', competenceMonth: 12, competenceYear: 2026,
      totalExpenses: new Money(100), totalPaid: new Money(999), status: InvoiceStatus.Paid, payments: [],
      receivablesFromThirdParties: new Money(0), isClosed: false, createdAt: new Date(), updatedAt: new Date() });
    expect(invoice.totalPaid.amount).toBe(0);
    expect(invoice.balance.amount).toBe(100);
    expect(invoice.status).toBe(InvoiceStatus.Open);
  });
});
