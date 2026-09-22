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

Estrutura inicial criada (scaffold):
src/
  app/
    router/
    config/
    providers/

  core/
    errors/
    result/
    types/
    constants/

  domain/
    user/
    organization/
    module/
    automation/
    integration/

  application/
    auth/
    organizations/
    catalog/
    dashboard/
    modules/

  infrastructure/
    api/
    repositories/
    mocks/
    storage/

  presentation/
    components/
    pages/
    layouts/
    composables/

  assets/
  styles/

Essa estrutura respeita a regra: Domain e Application não dependem de Vue.

Dependências e Injeção
- Interfaces de Repositories definidas no Domain/Ports
- Implementações (Mocks) colocadas em infra/mock
- Use factories/providers para trocar implementações facilmente

Qualidade
- TypeScript estrito
- Linters e formatação (ESLint, Prettier)
- Testes unitários com Vitest; E2E com Playwright


Atualização da apresentação pública — 2026-09-13
- A árvore acima descreve o scaffold. A landing reutiliza também src/components/{brand,home}, src/config/brand.ts e src/data/{team,solutions}.ts, introduzidos na evolução local.
- Home.vue apenas compõe seções; estilos de seção são scoped, com tokens globais centralizados.
- A rota / permanece única; navegação interna por âncoras sem estado global desnecessário.
- Decisões: ADR-002, ADR-009 e ADR-010. Domain e Application continuam sem dependência de Vue.
