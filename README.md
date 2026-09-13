SomaPrumo
=========

Plataforma SaaS B2B para automação, com foco inicial em Contabilidade e Engenharia/Construção.

Neste repositório: documentação, decisões arquiteturais e regras de continuidade do projeto.

Características principais
- Frontend: Vue 3, TypeScript, Vite, Vue Router, Pinia, Composition API (script setup)
- Arquitetura: Clean Architecture (adaptada ao frontend), SOLID, Domain/Feature-oriented, Repository Pattern, Dependency Inversion
- Backend: ainda não existe — dados simulados via Mock Repositories
- Testes: obrigatórios (Vitest + Playwright)

Estrutura de documentos
- PROJECT_STATE.md — estado corrente do projeto
- AGENTS.md — instruções para agentes antes e depois de programar
- docs/ — documentação do produto, arquitetura, testes, etc.

Primeiros passos
1. Ler AGENTS.md e PROJECT_STATE.md
2. Revisar docs/ antes de qualquer implementação
# SomaPrumo
## Ambiente de desenvolvimento

Use Node 24.15 ou superior da linha 24 (`nvm use`, versão definida em `.nvmrc`). O CI usa o mesmo arquivo. Execute `npm ci`, `npm run check` e, após `npx playwright install chromium`, `npm run test:e2e`.
