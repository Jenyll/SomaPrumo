Frontend Architecture
---------------------

Stack principal
- Vue 3 + TypeScript + Vite
- Vue Router para roteamento
- Pinia para estado global
- Composition API com script setup

Organização do código
- Feature-oriented folders: cada domínio/feature contém componentes, store, use-cases e adapters
- Exemplo de árvore:
  - src/features/projects/components
  - src/features/projects/usecases
  - src/features/projects/repositories

Dependências e Injeção
- Interfaces de Repositories definidas no Domain/Ports
- Implementações (Mocks) colocadas em infra/mock
- Use factories/providers para trocar implementações facilmente

Qualidade
- TypeScript estrito
- Linters e formatação (ESLint, Prettier)
- Testes unitários com Vitest; E2E com Playwright
