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


ADR-009: Identidade editorial — Cormorant Garamond + Inter e charcoal/bronze
- Data: 2026-09-13
- Status: implementado; substitui a escolha de Manrope no ADR-007.
- Decisão: centralizar Cormorant Garamond/Inter e tokens semânticos em assets/styles; grandes superfícies charcoal, ivory e sand, bronze pontual com variante de texto acessível em fundo claro.
- Justificativa: briefing e trabalho local aprovam identidade institucional editorial, com fotografia e hierarquia tipográfica; evitar conflitos entre tokens e overrides globais.
- Assets oficiais permanecem intactos. Sem biblioteca visual adicional.

ADR-010: Landing comercial focada e independente do domínio operacional
- Data: 2026-09-13
- Status: implementado.
- Decisão: compor Home com componentes em src/components/home, conteúdo de pilares em src/data/solutions.ts e marca/navegação/contato em src/config/brand.ts.
- Justificativa: evoluir o frontend existente incrementalmente, mantendo ADR-001/002/003/004 e a independência de Domain/Application. Conteúdo comercial não altera ModuleKind nem antecipa implementação de produtos.
- Quatro pilares públicos: Financeiro, Contabilidade, Fiscal e Investimentos; automação personalizada e auditoria fiscal atravessam a narrativa. Engenharia permanece apenas possibilidade interna futura, sem exposição pública.
- A credencial de auditor fiscal na operação é confirmada pelo briefing, sem atribuir nomes, métricas ou promessas tributárias.
- CTAs usam âncoras reais; contato temporário “loreimpus”, por instrução explícita do responsável. Sem URL fictícia ou envio simulado; href oficial será configurado depois.
- Testes E2E usam Chromium nas oito larguras solicitadas, teclado e reduced motion; ADR-005/006 mantidos.


ADR-011: Node 24 para desenvolvimento e CI
- Data: 2026-09-13
- Status: implementado.
- Decisão: .nvmrc define Node 24; CI lê o mesmo arquivo. Usar versão 24.15 ou superior da linha 24, compatível com jsdom 30 já fixado no lockfile.
- Justificativa: CI anterior usava Node 20 e falhou ao inicializar o Vitest (undici/webidl.util.markAsUncloneable), embora a validação local em Node 24.18 passasse. O problema precedia a refatoração e foi evidenciado no primeiro PR. Nenhuma dependência foi atualizada para contornar o erro.
