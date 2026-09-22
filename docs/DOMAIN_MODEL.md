# Modelo de domínio

## Financeiro — núcleo concluído em 22/09/2026 (ADR-012)

- **Money**: centavos inteiros seguros. Construtor recebe reais como número finito ou decimal completo com ponto. Arredondamento decimal para centavos, metade para longe de zero. Valores localizados como “50.000,00” precisam de conversão explícita anterior; não são parcialmente interpretados. JSON usa centavos inteiros. Divisões conservam o total, inclusive para valores negativos.
- **Account**: conta corrente, carteira, poupança ou cartão, saldo inicial, saldo calculado, limite e estado ativo. Desativação preserva histórico. O caso de uso não aceita saldo inicial em cartão: seus débitos vêm das faturas. Investimentos têm cadastro próprio.
- **AccountMovement**: ID, accountId, sourceId, tipo, data e valor positivo. Tipos distinguem receita, despesa à vista, pagamento de fatura, reembolso, transferência e investimento. Uma compra no cartão não é lançamento de caixa.
- **Expense**: compra com ID, número único, data, categoria e valor total. **ExpenseInstallment**: parcela com ID, expenseId, número, valor, mês/ano e invoiceId opcional. Esta entidade é a fonte do realizado mensal e dos totais de faturas, evitando repetir o valor integral da compra.
- **ExpenseDetail**: alocação de uma parcela a uma pessoa; expenseId e installmentId identificam a origem. A soma por parcela e a soma por pessoa são conservadas em centavos. Apenas participações de terceiros com valor positivo geram recebíveis.
- **Invoice**: única por cartão, mês e ano. totalExpenses soma parcelas; totalPaid soma pagamentos. Status financeiro Open/PartiallyPaid/Paid é independente de isClosed. Fechar bloqueia novas despesas, mas permite pagamento e recebimentos. Não apaga terceiros. O valor Closed do enum anterior fica reservado e não é gerado automaticamente.
- **InvoicePayment**: pagamento positivo, invoiceId, accountId, data e ID próprio. Não aceita duplicidade, referência a outra fatura nem pagamento excedente. Créditos/estornos de fatura exigem fluxo futuro específico.
- **Receivable**: devedor, credor, expenseDetailId, invoiceId opcional e competência da origem. Preserva originalAmount e receivedAmount. Baixa requer motivo e data, expõe writtenOffAmount e zera apenas pendingAmount. Não aceita novos recebimentos depois da baixa.
- **Receipt**: comprovante lógico do recebimento, com receivableId, conta, data efetiva, valor e competência/fatura herdadas da origem. Recebimento em setembro de dívida de outubro não muda a competência para setembro.
- **Transfer**: contas de origem/destino distintas, data, valor positivo e confirmação. O caso de uso grava as duas pernas atomicamente.
- **Budget**: categoria, mês/ano, planejado e realizado. difference = planejado - realizado; valores negativos continuam visíveis. Não há limiar arbitrário de 80%; AtRisk permanece reservado no enum. Uma categoria/período aceita um orçamento.
- **Provision**: compromisso previsto positivo por categoria/período, ativo e realizedInstallmentId opcional. A realização integral associa uma parcela existente da mesma categoria/competência. O valor realizado pode diferir da estimativa. Pendência prevista é separada do realizado; a mesma parcela não pode realizar duas provisões.
- **Investment / InvestmentMovement**: renda fixa com aportes, resgates, taxas e rendimentos registrados. Saldo deriva do histórico. Aporte e rendimento somam; resgate e taxa subtraem. Aporte/resgate afetam também a conta de caixa. Taxas e rendimentos deste módulo são internos ao investimento. O nome legado Buyback significa aporte. Não calcula retorno futuro.
- **FinancialRepository**: porta de unidade de trabalho, com read e transact. **MockFinancialRepository**: começa vazio, reconstrói entidades a partir de JSON, devolve cópias e só confirma após sucesso completo. Não persiste entre sessões.
- **AuditRecord**: commandId único, actorId, ação, timestamp e revisão incremental. Operações repetidas são rejeitadas sem efeito parcial. O actorId é fornecido pelo chamador do mock; não representa autenticação real.

## Serviços

FinancialWorkspace é a entrada dos comandos persistidos: contas, receitas, compras, faturas, recebimentos/baixas, transferências, investimentos, orçamentos e provisões. Recalcula saldos e resumos na mesma unidade de trabalho auditada.

ExpenseService cuida de criação, divisões e cronograma. InvoiceService usa métodos públicos da entidade; não altera propriedades privadas por casts. AccountService calcula caixa a partir de movimentos da conta, e BudgetService separa realizado e compromissos pendentes.

Entidades e serviços puros trabalham sobre rascunhos. Gravação e auditoria são responsabilidade do caso de uso/repositório, seguindo ADR-002/003/004. Não persistir mutações chamando métodos de entidade fora dessa unidade de trabalho.

## Demais domínios

User, Organization, Module, Automation e Integration anteriores permanecem independentes. Modelos de construção/projetos são visão futura interna, sem implementação pública (ADR-010). Cadastro operacional completo de pessoas, categorias, objetos e projetos será conectado posteriormente; esta etapa usa IDs explícitos.
