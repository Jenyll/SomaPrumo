Projeto: SomaPrumo
===================

Fase atual:
- Inicialização / documentação (Discovery & Setup)

Objetivo atual:
- Preparar a estrutura documental, decisões arquiteturais e regras de continuidade. Não implementar telas ou funcionalidades.

Concluído:
- Documento inicial do produto (docs/PRODUCT.md)
- Decisões arquiteturais iniciais (docs/DECISIONS.md)
- Estrutura de docs criada

Em andamento:
- Preenchimento de detalhes de arquitetura frontend e modelos de domínio
- Scaffold frontend inicial em progresso (branch feat/frontend-foundation)

Próximos passos:
- Definir mocks e contratos de API iniciais (docs/API_CONTRACTS.md, docs/MOCKS.md)
- Padronizar validações e regras de negócio (docs/VALIDATIONS.md, docs/BUSINESS_RULES.md)
- Criar esqueleto de project setup (sem telas)
- Scaffold frontend criado; executar checagens e corrigir problemas

Problemas conhecidos:
- Backend inexistente — depender de Mock Repositories
- Recursos/PO ainda não definidos (contato para decisões de produto)

Decisões pendentes:
- Detalhes do modelo de autorização/autenticação
- Padrões de deploy e CI/CD

Status dos testes:
Configuração de framework definida (Vitest + Playwright).
- Testes unitários: passando (1 teste de smoke)
- E2E: configuração inicial pronta (sem testes E2E implementados)

Último build válido:
Build de scaffold válido: `vite build` executado com sucesso em 2026-08-30.

