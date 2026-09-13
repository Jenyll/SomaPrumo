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


Landing institucional — execução local e CI
- npm run check: type-check, lint, Vitest e build.
- npx playwright install chromium: instalar navegador para E2E.
- npm run test:e2e: inicia o Vite automaticamente quando necessário (porta 5173); fora de CI pode reutilizar servidor existente.
- Nesta sessão macOS: PLAYWRIGHT_BROWSERS_PATH=/tmp/somaprumo-browsers npm run test:e2e. O sandbox exigiu autorização para iniciar Vite, instalar e executar Chromium.
- Em CI, instalar navegador com npx playwright install --with-deps chromium.

Resultados em 2026-09-13
- Baseline: check passou com 1 teste; Playwright falhou por ausência de testes. Não foi regressão.
- Final: check passou com 5 testes de componente; Playwright passou com 10 testes.
- Componente/integração da Home: posicionamento, ausência de métricas falsas/vertical futuro, destinos internos, menu e placeholder sem endpoint fictício.
- E2E: 375/390/430/768/1024/1280/1440/1920 px, âncoras, detalhes de pilares, imagens carregadas, ausência de overflow, ausência de erros JS/console, navegação mobile, Escape, foco, skip link, carrossel e reduced motion.
- Capturas de Home e Hero por largura em test-results/home-landing-links-and-images-at-{largura}px/. Capturas são artefatos locais ignorados pelo Git e regeneradas a cada execução.
- Revisão visual complementar de seções em 375 e 768 px. Validar hierarquia, respiro, fotos, controle de carrossel e contato.
- Não há suítes de integração real com backend, pois ele não existe. Nenhum teste anterior foi removido.
- Testes executados em Chromium; outros motores e auditoria WCAG completa não fazem parte da evidência desta execução.

Ambiente de execução (ADR-011)
- Usar Node 24.15+ da linha 24; .nvmrc e CI compartilham a versão 24.
- CI inicial do PR falhou com Node 20 na inicialização de jsdom/undici, antes de executar testes. Corrigida a configuração de runtime para corresponder ao ambiente local validado (24.18).
