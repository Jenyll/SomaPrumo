import { Invoice, InvoicePayment, Money, InvoiceStatus } from '../../domain/financial';
export class InvoiceService {
  createInvoice(data: { cardAccountId: string; competenceMonth: number; competenceYear: number }): Invoice {
    return new Invoice({ ...data, id: crypto.randomUUID(), totalExpenses: new Money(0), totalPaid: new Money(0),
      status: InvoiceStatus.Open, payments: [], receivablesFromThirdParties: new Money(0), isClosed: false,
      createdAt: new Date(), updatedAt: new Date() });
  }
  setTotalExpenses(invoice: Invoice, total: Money): Invoice { invoice.setTotalExpenses(total); return invoice; }
  registerPayment(invoice: Invoice, data: { id?: string; date: Date; amount: Money; accountId: string; notes?: string }): InvoicePayment {
    const payment = new InvoicePayment({ ...data, id: data.id ?? crypto.randomUUID(), invoiceId: invoice.id, createdAt: new Date() });
    invoice.addPayment(payment);
    return payment;
  }
  setReceivablesFromThirdParties(invoice: Invoice, amount: Money): Invoice { invoice.setReceivablesFromThirdParties(amount); return invoice; }
  closeInvoice(invoice: Invoice): Invoice { invoice.close(); return invoice; }
}
