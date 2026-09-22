Contratos de API (contratos para mocks e futuro backend)
-----------------------------------------------------

Princípios
- Definir contratos simples REST/JSON para cada Resource para facilitar substituição por backend real.
- Usar versões nas rotas (/v1/) e manter payloads concisos.

Exemplos iniciais (mock)
- GET /v1/projects -> { data: Project[] }
- GET /v1/projects/:id -> { data: Project }
- POST /v1/projects -> { data: Project }
- GET /v1/accounts -> { data: Account[] }
- POST /v1/ledger-entries -> { data: LedgerEntry }

Formato de resposta padrão
- { success: boolean, data: any, errors?: string[] }

Status codes
- 200: OK
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error (mock)

Notas
- Enquanto não houver backend, mocks devem respeitar esses contratos para facilitar migração futura.

## Financeiro em memória — ADR-012

Não há endpoints financeiros HTTP implementados. A porta FinancialRepository e FinancialWorkspace são o contrato executável atual. Um futuro adaptador HTTP deverá preservar estas invariantes.

- Contexto de cada comando: { commandId: string, actorId: string }. Repetição de commandId é erro sem novos efeitos.
- Valores: Money no domínio; número inteiro de centavos no JSON (12345 representa R$ 123,45). O construtor Money recebe reais, enquanto fromJSON/fromCents recebem centavos.
- Datas: Date em memória; ISO 8601 no JSON, reidratadas na leitura. Mês e ano de competência são inteiros independentes da data de caixa.
- createAccount: nome, tipo, saldo inicial e limite opcional. Cartão exige limite e saldo inicial zero.
- recordIncome: conta, valor, data e descrição. Saldo inicial é campo da conta; não é registrado novamente como receita.
- recordPurchase: dados da compra, conta/cartão, firstMonth, firstYear e divisão opcional people. Gera parcelas, faturas quando necessário, alocações e recebíveis numa operação.
- payInvoice: invoiceId, conta de débito, data e valor positivo. Pagamento parcial permitido; excedente e duplicação rejeitados.
- receive: receivableId, conta, data e valor. A fatura/competência são herdadas da origem, nunca inferidas pelo nome ou mês do pagamento.
- closeInvoice e writeOff são independentes. A baixa requer motivo.
- transfer: contas distintas, valor e data. As duas pernas são confirmadas ou nenhuma é.
- createInvestment/moveInvestment: aporte e resgate exigem conta de caixa; taxa e rendimento são internos ao investimento.
- createBudget: categoria, competência e planejado. Realizado é derivado das parcelas.
- createProvision/realizeProvision: compromisso previsto e vínculo único com parcela efetiva de mesma categoria/competência. Realização integral; não é um pagamento.
- read: snapshot independente de contas, compras, parcelas, alocações, faturas, recebíveis, recibos, investimentos, orçamentos, provisões, transferências, movimentos e auditoria.
- receivablesByPeriod: saldos pendentes em passado, atual, próximo mês, segundo próximo, futuro e não atribuídos.

Exemplo de consumo local (sem UI ou backend):

~~~ts
const workspace = new FinancialWorkspace(new MockFinancialRepository());
const accountId = workspace.createAccount(
  { actorId: 'operador-demo', commandId: 'criar-conta-1' },
  { name: 'Conta demonstrativa', type: AccountType.CheckingAccount, initialBalance: new Money(1000) },
);
workspace.recordPurchase(
  { actorId: 'operador-demo', commandId: 'compra-1' },
  { accountId, purchaseNumber: 1, date: new Date('2026-10-01T12:00:00Z'),
    amount: new Money(100), category: 'Serviços', firstMonth: 10, firstYear: 2026 },
);
workspace.read().accounts[0].currentBalance.amount; // 900
~~~

Importe FinancialWorkspace de src/application/financial, MockFinancialRepository de src/infrastructure/repositories/MockFinancialRepository e Money/AccountType de src/domain/financial. O mock começa sem dados e perde o estado ao ser recriado.
