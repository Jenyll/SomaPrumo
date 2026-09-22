# SomaPrumo — estado atual

Atualizado em 22/09/2026.

## Concluído

- Landing comercial editorial, marca, navegação, acessibilidade e login demonstrativo preservados.
- Núcleo financeiro derivado das regras válidas da planilha: despesas, parcelas por competência, rateios, faturas/pagamentos, recebíveis/baixas, contas, transferências, orçamento, provisões e movimentos de renda fixa.
- Correção da implementação interrompida: sintaxe, imports/exports, precisão monetária, sinais, datas, duplicidades e encapsulamento.
- FinancialWorkspace integra os cálculos com um repositório mock vazio, unidade de trabalho atômica e auditoria por usuário/operação/data.
- Documentação de análise, regras, domínio e contratos atualizada no ADR-012.

## Limites e próximos marcos

- O núcleo financeiro é consumível por código e testado; ainda não está conectado a telas.
- Mock em memória: sem persistência entre sessões, backend, autenticação real, autorização multiusuário ou integração bancária.
- Não há importador XLSM; dados pessoais/de teste do arquivo não foram carregados no produto.
- Cadastros operacionais completos, estornos/créditos, baixa parcial de provisões e políticas de fechamento/vencimento de cartão são etapas futuras.
- Renda variável, câmbio, fiscal avançado e engenharia não foram antecipados.
- Canal comercial oficial continua pendente de definição.

## Validação

- npm run check: tipos, lint, 56 testes unitários/integração e build aprovados.
- Testes de navegador locais bloqueados na inicialização do Chromium pelo sandbox macOS; detalhes em docs/TESTING.md.

## Ambiente

Vue 3, TypeScript, Vite, Vue Router e Pinia. Node 24 conforme ADR-011. Sem dependências novas.
