# Planilha 2026 v8.0 e adaptação ao SomaPrumo

Análise estrutural e de fórmulas do arquivo fornecido pelo usuário, em 22/09/2026. Foram encontradas 13 abas e 132.303 células com fórmulas, muitas repetidas. Não foram executadas macros nem feito recálculo pelo Excel. Valores salvos não comprovam recálculo atual.

## Origem e adaptação

| Origem | Regra aproveitada | Implementação |
| --- | --- | --- |
| D1/D2 | Compra, parcela, divisão e total próprio/terceiros | Expense, ExpenseInstallment, ExpenseDetail e recordPurchase |
| CC | Fatura por cartão/competência, pagamentos parciais e fechamento | Invoice, InvoicePayment, payInvoice e closeInvoice |
| PP/R | Recebimento ligado à pessoa e origem, preservando competência | Receivable, Receipt, receive e receivablesByPeriod |
| T2 | Contas, transferências, saldos e limite disponível | Account, AccountMovement, Transfer e AccountService |
| M | Planejado, realizado e diferença por categoria/período | BudgetService, com realizado separado de provisões pendentes |
| PP | Compromisso previsto ligado à realização | Provision e realizeProvision |
| I | Aporte, resgate, taxa, rendimento | Investment, InvestmentMovement e moveInvestment |
| T1/T3/T4 | Cadastros e relacionamentos estáveis | Identificadores; cadastro completo de pessoas/categorias/projetos ainda não é uma tela operacional |
| H | Preparação/importação | Validação de dados e tipos; não há importador XLSM |
| W | Rótulos de funcionalidades | Não usados como prova de implementação |

## Problemas confirmados ou identificados para revisão

- H!B2:B509: busca em AG4:AG58 (55 linhas) com retorno em AF4:AF138 (135 linhas). Há 508 erros #VALUE! salvos.
- M!F199 contém =#REF!. Não é possível afirmar, apenas pela fórmula, como a referência foi perdida.
- PP!P4 usa M4 na condição, diferentemente de H4 nas colunas vizinhas. A adaptação usa estado explícito da provisão.
- PP!Z4 e seguintes misturam Pessoa e Local; referências aos cabeçalhos de mês/ano também se deslocam ao copiar. A aplicação agrupa por competência numérica, inclusive nas viradas de ano.
- R!P7 procura a chave composta “cartão - fatura” em uma lista de nomes de faturas. O valor salvo usa o mês do recebimento (setembro) em vez da fatura vinculada (outubro). Receipt conserva ambos separadamente e referencia a fatura por ID.
- T2!G4:I4 não inclui os movimentos de investimento calculados na coluna O. A aplicação registra o efeito de caixa de aporte/resgate na mesma transação do investimento.
- CC!S3 pode zerar a pendência quando “Fechar” é marcado. Fechamento, recebimento e baixa justificada são operações distintas.
- M!D187 e equivalentes limitam diferenças negativas a zero. O orçamento da aplicação preserva o excesso.
- Há moeda como texto (por exemplo T2!W4), datas com conteúdo de conta (R!C3/C7), e dados demonstrativos. Não foram importados como dados padrão.
- Em I, resgates/taxas usam valores negativos e o saldo soma os movimentos com sinal. A API usa valores positivos e um tipo explícito, aplicando o sinal uma única vez.

## Resultado da revisão da implementação iniciada

O domínio e três serviços estavam iniciados, mas Money e InvoiceService estavam interrompidos. Existiam imports relativos incorretos, dependência uuid ausente e exports de tipos incompletos. Os testes de investimento usavam sinais contraditórios e o teste de orçamento verificava uma função inventada dentro do teste.

Foram concluídos o núcleo financeiro, os cálculos, a orquestração transacional, o repositório mock vazio, a auditoria e testes reais. A divisão preserva simultaneamente total da compra, soma das parcelas e total de cada pessoa.

## Limites da entrega (ADR-012)

A entrega é o núcleo operacional em Domain/Application/Infrastructure. Não cria tela financeira, backend, autenticação ou persistência entre sessões. A landing e o login demonstrativo permanecem intactos. Não foram adicionados renda variável, câmbio, fiscal avançado, integrações bancárias, n8n ou engenharia. Não há promessa de rentabilidade ou importação automática da planilha.
