Projeto: SomaPrumo
===================

Fase atual
- Landing institucional refatorada para Plataforma + Automação + Especialização (2026-09-13).

Objetivo concluído nesta etapa
- Apresentação comercial de operações financeiras, contábeis e fiscais, com automações personalizadas e auditoria fiscal; foco B2B e atendimento também a pessoas físicas.

Concluído
- Documentação inicial, scaffold Vue 3/TypeScript/Vite e camadas existentes preservados.
- Trabalho local anterior de rebranding, alias @ e assets oficiais incorporado à evolução.
- Tokens charcoal/bronze/sand/ivory e Cormorant Garamond + Inter centralizados (ADR-009).
- Header responsivo, Hero editorial, quatro pilares, automação, metodologia, auditoria, tecnologia, equipe, CTA e footer.
- Removidos da UI pública métricas sem evidência e conteúdo de engenharia/construção.
- Navegação por âncoras, detalhes das áreas, carrossel acessível e reduced motion.
- Revisão visual em 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px, sem overflow horizontal detectado.
- Type-check, lint, 5 testes Vitest e 10 testes Playwright passando; build local válido em 2026-09-13.
- Auditoria e baseline registrados em docs/FRONTEND_AUDIT.md; continuidade em docs/PROGRESS.md.

Pendências
- Contato real será adicionado pelo responsável. Placeholder autorizado: “loreimpus” em src/config/brand.ts (`contact.label` e `contact.href`).
- Backend inexistente; módulos e integrações são apresentação comercial, não operações reais.
- Contratos de API, fixtures, regras e autenticação real continuam para etapas futuras; não alterados nesta tarefa.
- Original partner-1.svg tem 5,59 MB; preservado com carregamento tardio. Avaliar derivados otimizados futuramente.
- Fontes dependem de Google Fonts, com fallbacks locais.

Decisões
- ADR-001 a ADR-006 mantidos: Vue, Clean Architecture, repositories, mocks, Vitest e Playwright.
- ADR-007 evoluído pelo ADR-009: Inter como fonte funcional aprovada.
- ADR-008 mantido: n8n fora da arquitetura.
- ADR-010: escopo comercial atual, apresentação separada do domínio e contato temporário.

Validação
- npm run check: passou.
- npm run test:e2e: 10 passaram, Chromium instalado para a sessão em /tmp/somaprumo-browsers.
- Nenhuma suíte separada de integração com backend existe; Vitest monta e exercita a Home integrada aos componentes.
- PR aberto: https://github.com/Jenyll/SomaPrumo/pull/1 — feat/landing-institucional → feat/frontend-foundation.
- Arquivo incremental tsconfig.tsbuildinfo permanece com alteração local, fora do commit.
