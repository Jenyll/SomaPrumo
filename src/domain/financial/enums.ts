/**
 * Enums para estados e tipos financeiros
 */

/**
 * Status de uma fatura de cartão
 */
export enum InvoiceStatus {
  Open = 'open',
  PartiallyPaid = 'partially_paid',
  Paid = 'paid',
  Closed = 'closed',
}

/**
 * Status de valor a receber de terceiros
 */
export enum ReceivableStatus {
  Pending = 'pending', // Não recebido ainda
  PartiallyReceived = 'partially_received', // Parte recebida
  Received = 'received', // Totalmente recebido
  WrittenOff = 'written_off', // Baixado (não vai receber, decisão consciente)
}

/**
 * Tipo de conta financeira
 */
export enum AccountType {
  CheckingAccount = 'checking', // Conta corrente
  CreditCard = 'credit_card', // Cartão de crédito
  CashWallet = 'cash', // Carteira (dinheiro físico)
  SavingsAccount = 'savings', // Poupança
  Investment = 'investment', // Conta de investimento
}

/**
 * Tipo de transferência
 */
export enum TransferType {
  BetweenAccounts = 'between_accounts', // Transferência entre contas próprias
  FromThirdParty = 'from_third_party', // Recebimento/entrada de terceiros
  ToThirdParty = 'to_third_party', // Pagamento/saída para terceiros
}

/**
 * Tipo de movimento de investimento
 */
export enum InvestmentMovementType {
  Buyback = 'buyback', // Aporte (aplicação)
  Redemption = 'redemption', // Resgate (retirada)
  Fee = 'fee', // Taxa (saída)
  Yield = 'yield', // Rendimento (entrada)
}

/**
 * Tipo de provisão
 */
export enum ProvisionType {
  Expense = 'expense', // Despesa futura (ex: aluguel, contas)
  Tax = 'tax', // Imposto/tributo
  Service = 'service', // Serviço contratado
  Debt = 'debt', // Dívida futura
}

/**
 * Tipo de orçamento e sua cobertura
 */
export enum BudgetStatus {
  OnTrack = 'on_track', // Dentro do orçado
  AtRisk = 'at_risk', // Próximo ao limite
  Exceeded = 'exceeded', // Passou do orçado
}
