/**
 * Testes para cenários críticos de negócio
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  Money,
  Receivable,
} from '../../src/domain/financial';
import { InvoiceStatus, ReceivableStatus, AccountType } from '../../src/domain/financial/enums';
import {
  ExpenseService,
  InvoiceService,
  AccountService,
} from '../../src/application/financial';

describe('Cenários Críticos de Negócio', () => {
  let expenseService: ExpenseService;
  let invoiceService: InvoiceService;
  let accountService: AccountService;

  beforeEach(() => {
    expenseService = new ExpenseService();
    invoiceService = new InvoiceService();
    accountService = new AccountService();
  });

  describe('Compra parcelada atravessando dezembro/janeiro', () => {
    it('registra parcelas corretas sem duplicação', () => {
      // Compra de 300 reais em 3x, começando em dezembro de 2026
      const expense = expenseService.createExpense({
        purchaseNumber: 1,
        date: new Date('2026-12-01'),
        amount: new Money(300),
        category: 'Eletrônicos',
        installments: 3,
        invoiceMonth: 'dez.2026',
      });

      expect(expense.installments).toBe(3);
      expect(expense.getAmountPerInstallment().amount).toBeCloseTo(100, 2);

      // Valor total não é duplicado
      expect(expense.amount.amount).toBe(300);
    });
  });

  describe('Divisão com ajuste de centavos', () => {
    it('divide 100 reais entre 3 pessoas sem perder centavos', () => {
      const expense = expenseService.createExpense({
        purchaseNumber: 2,
        date: new Date('2026-10-15'),
        amount: new Money(100),
        category: 'Alimentação',
      });

      const details = expenseService.splitExpense(expense, [
        { personId: 'alice', isPaymentOwner: true },
        { personId: 'bob' },
        { personId: 'charlie' },
      ]);

      expect(details.length).toBe(3);

      // Somar todos os detalhes
      const sum = details.reduce((acc, d) => acc.add(d.amount), new Money(0));
      expect(sum.equals(expense.amount)).toBe(true);

      // Último detalhe recebe ajuste se necessário
      expect(details[2].amount.amount).toBeGreaterThanOrEqual(33.33);
    });

    it('divide 50 reais entre 2 pessoas (25 cada)', () => {
      const expense = expenseService.createExpense({
        purchaseNumber: 3,
        date: new Date('2026-10-16'),
        amount: new Money(50),
        category: 'Bebidas',
      });

      const details = expenseService.splitExpense(expense, [
        { personId: 'alice' },
        { personId: 'bob' },
      ]);

      expect(details[0].amount.amount).toBe(25);
      expect(details[1].amount.amount).toBe(25);
    });
  });

  describe('Pagamento parcial de fatura', () => {
    it('registra múltiplos pagamentos até quitar', () => {
      const invoice = invoiceService.createInvoice({
        cardAccountId: '123',
        competenceMonth: 10,
        competenceYear: 2026,
      });

      invoiceService.setTotalExpenses(invoice, new Money(500));
      expect(invoice.status).toBe(InvoiceStatus.Open);

      // Primeiro pagamento: 200
      invoiceService.registerPayment(invoice, {
        date: new Date('2026-10-20'),
        amount: new Money(200),
        accountId: 'conta-1',
      });

      expect(invoice.status).toBe(InvoiceStatus.PartiallyPaid);
      expect(invoice.balance.amount).toBe(300);

      // Segundo pagamento: 300 (quitando)
      invoiceService.registerPayment(invoice, {
        date: new Date('2026-10-27'),
        amount: new Money(300),
        accountId: 'conta-1',
      });

      expect(invoice.status).toBe(InvoiceStatus.Paid);
      expect(invoice.balance.isZero()).toBe(true);
    });
  });

  describe('Recebimento parcial de terceiro', () => {
    it('rastreia recebimentos parciais sem baixa automática', () => {
      const receivable = new Receivable({
        id: '789',
        debtorPersonId: 'bob',
        creditorPersonId: 'alice',
        expenseDetailId: 'detail-1',
        originalAmount: new Money(100),
        receivedAmount: new Money(0),
        status: ReceivableStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(receivable.status).toBe(ReceivableStatus.Pending);
      expect(receivable.pendingAmount.amount).toBe(100);

      // Bob transfere 60
      receivable.registerReceipt(new Money(60));
      expect(receivable.status).toBe(ReceivableStatus.PartiallyReceived);
      expect(receivable.pendingAmount.amount).toBe(40);

      // Bob transfere mais 40 (completo)
      receivable.registerReceipt(new Money(40));
      expect(receivable.status).toBe(ReceivableStatus.Received);
      expect(receivable.pendingAmount.isZero()).toBe(true);
    });

    it('permite baixa (write-off) com motivo sem apagar registro', () => {
      const receivable = new Receivable({
        id: '790',
        debtorPersonId: 'bob',
        creditorPersonId: 'alice',
        expenseDetailId: 'detail-2',
        originalAmount: new Money(50),
        receivedAmount: new Money(0),
        status: ReceivableStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      receivable.writeOff('Bob saiu do país');
      expect(receivable.status).toBe(ReceivableStatus.WrittenOff);
      expect(receivable.writtenOffReason).toBe('Bob saiu do país');
      expect(receivable.writtenOffDate).toBeDefined();

      // Ainda consegue recuperar dados
      expect(receivable.originalAmount.amount).toBe(50);
    });
  });

  describe('Transferência entre contas', () => {
    it('calcula saldo correto com transferência saída/entrada', () => {
      const contaOrig = accountService.createAccount({
        name: 'Conta Inter',
        type: AccountType.CheckingAccount,
        initialBalance: new Money(1000),
      });

      const contaDest = accountService.createAccount({
        name: 'Carteira',
        type: AccountType.CashWallet,
        initialBalance: new Money(100),
      });

      // Transferência de 300 de Inter para Carteira
      const movements1 = [
        {
          id: 't-out', sourceId: 't', accountId: contaOrig.id, type: 'transfer_out' as const,
          date: new Date(),
          amount: new Money(300),
        },
      ];

      const movements2 = [
        {
          id: 't-in', sourceId: 't', accountId: contaDest.id, type: 'transfer_in' as const,
          date: new Date(),
          amount: new Money(300),
        },
      ];

      accountService.updateBalance(contaOrig, movements1);
      accountService.updateBalance(contaDest, movements2);

      expect(contaOrig.currentBalance.amount).toBe(700); // 1000 - 300
      expect(contaDest.currentBalance.amount).toBe(400); // 100 + 300
    });
  });

  describe('Cadastro inativo com histórico', () => {
    it('preserva dados ao desativar conta', () => {
      const account = accountService.createAccount({
        name: 'Conta antiga',
        type: AccountType.CheckingAccount,
        initialBalance: new Money(0),
      });

      expect(account.isActive).toBe(true);

      accountService.deactivateAccount(account);
      expect(account.isActive).toBe(false);

      // Dados não são apagados
      expect(account.name).toBe('Conta antiga');
      expect(account.initialBalance.amount).toBe(0);
    });
  });
});
