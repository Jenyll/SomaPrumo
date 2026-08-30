Testing Strategy
---------------

Frameworks
- Unit: Vitest
- E2E: Playwright

Regras
- Testes são obrigatórios para novas features e refactors
- Cobertura mínima recomendada: 80% para unidades críticas

Tipos de teste
- Unitários: validators, use-cases, domain logic
- Integração: repositories (mocks), stores
- E2E: fluxos críticos com Playwright

CI
- Pipeline deve executar: type-check, lint, testes unitários, E2E (quando aplicável)
