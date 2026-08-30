Decisions / ADRs iniciais
------------------------

ADR-001: Vue 3 + TypeScript + Vite
- Data: 2026-08-30
- Decisão: Adotar Vue 3 com TypeScript e Vite para o frontend.
- Justificativa: performance, ecosistema e compatibilidade com Composition API.

ADR-002: Clean Architecture no frontend
- Data: 2026-08-30
- Decisão: Aplicar Clean Architecture adaptada ao frontend (camadas: Presentation, Application, Domain, Infrastructure).
- Justificativa: separação de responsabilidades e testabilidade.

ADR-003: Repository Pattern
- Data: 2026-08-30
- Decisão: Usar Repository Pattern para abstrair acesso a dados.
- Justificativa: facilita troca entre mocks e backend real.

ADR-004: Mock API antes do backend
- Data: 2026-08-30
- Decisão: Implementar Mock Repositories e fixtures até o backend existir.
- Justificativa: permitir desenvolvimento paralelo e testes.

ADR-005: Vitest
- Data: 2026-08-30
- Decisão: Vitest para testes unitários.
- Justificativa: integração com Vite e velocidade.

ADR-006: Playwright
- Data: 2026-08-30
- Decisão: Playwright para testes E2E.
- Justificativa: robustez e suporte cross-browser.

ADR-007: Tipografia inicial — Cormorant Garamond + Manrope
- Data: 2026-08-30
- Decisão: Usar Cormorant Garamond para títulos e Manrope para UI.
- Justificativa: combinação legível e com caráter.

ADR-008: n8n fora da arquitetura
- Data: 2026-08-30
- Decisão: n8n não faz parte da arquitetura atual.
- Justificativa: reduzir escopo inicial e complexidade arquitetural.

Como usar esta página
- Cada ADR deve conter: id, data, decisão, justificativa e status (aberto/implementado).
