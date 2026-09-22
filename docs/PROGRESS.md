Progress Log
------------

2026-08-30: Scaffold do frontend criado — arquivos iniciais, configs (Vite, TS, ESLint), testes mínimos (Vitest) e Playwright configurado.

Passos executados:
- Branch `feat/frontend-foundation` criada e scaffold commited.
- Dependências instaladas (npm install).
- Type-check (`tsc --noEmit`) — OK
- Lint (`eslint`) — OK (ajuste de nome de componente aplicado)
- Testes unitários (`vitest --run`) — OK (1 teste)
- Build (`vite build`) — OK (dist gerado)

Observação: Playwright configurado (sem testes E2E implementados). Para instalar navegadores execute `npm run playwright:install`.

- 2026-09-12: Rebranding visual aplicado na Home e base visual global. Ajuste de identidade, tipografia, paleta e estrutura de assets `src/assets`. (autor: agent)

- 2026-09-13: Conteúdo institucional e de time finalizados, removendo placeholders "loreImpus" e alinhando a copy da marca ao posicionamento da SomaPrumo. Validação final de type-check, lint, testes e build concluída. (autor: agent)

Progress Log
------------

- 2026-08-30: Criada estrutura documental inicial e ADRs. (autor: system)

Formato
- Registrar data, resumo curto, autor e links para PRs ou issues relacionados.


2026-09-13 — Evolução comercial e editorial do frontend
- Auditoria antes de editar: git status/diff/staged, documentação, camadas, componentes, mocks, fontes, tokens, assets e referência Innovar fornecida por HTML.
- Preservadas alterações locais anteriores e conteúdo binário dos assets oficiais; cópia inicial adicional em /tmp/somaprumo-before-work.tar.gz.
- Baseline: tipos/lint/1 teste/build aprovados; Playwright sem testes nem navegador instalado.
- Implementação incremental: tokens e fontes → header/Hero → pilares/automação/metodologia/auditoria/tecnologia → equipe/contato/footer.
- Corrigidos conteúdo de obras, números sem evidência, botões sem ação, foco/menu mobile e navegação do carrossel.
- Contato “loreimpus” mantido a pedido explícito do responsável; canal oficial pendente.
- ADR-009 e ADR-010 documentados; domínio e contratos existentes intactos.
- Validação: tipos e lint aprovados; 5 testes Vitest e 10 E2E aprovados; build aprovado. Inspeção visual nas oito larguras, sem overflow e sem erros de console nos E2E.
- Imagem de Hero local; retratos originais preservados com lazy loading. Documentação de produto, marca, design, arquitetura, rotas, regras, testes e estado atual atualizada.
- Entrega: PR #1 aberto (https://github.com/Jenyll/SomaPrumo/pull/1), branch feat/landing-institucional, commit de implementação 58eeae7. Integração GitHub retornou 403 na criação; PR concluído pela API com a autenticação Git já configurada.
- Pós-abertura do PR: CI identificou runtime Node 20 incompatível com jsdom 30 do lockfile. Corrigido para Node 24 via .nvmrc compartilhado (ADR-011), sem alterar dependências.

2026-09-13 — Revisão comercial da landing SomaPrumo
- Auditados Header, Hero, navegação, CTAs, duplicação de links e elementos repetitivos da Home.
- Reestruturada a jornada comercial em três perfis (Para você, MEI e Empresas) com tabs acessíveis e painel de detalhes por demanda.
- Reduzido o excesso institucional e reforçado o posicionamento comercial sem inventar checkout, WhatsApp ou contatos inexistentes.
- Header compactado, sticky, visual premium/editorial e com menu mobile limpo.
- Hero ajustado para a narrativa "Operações com clareza" e CTA secundário mantido como placeholder temporário.
- Criados componentes `TrustStrip`, `SolutionsExplorer`, `PlansPreview` e rota `/login` demonstrativa.
- Padronizados placeholders com comentário `// TODO: conectar à jornada comercial quando a rota estiver disponível.` e ausência de redirecionamento genérico.
- Validação concluída: type-check, lint, Vitest, build e Playwright aprovados.

2026-09-13 — Refinamento final do seletor comercial da home
- Ajustado o explorador comercial para manter a estrutura vertical de cards/accordion por público, sem redirecionamento comercial falso.
- Alinhadas as âncoras internas do menu com os IDs reais da home (`#para-voce`, `#mei`, `#empresas`, `#solucoes`, `#automacao`, `#auditoria`) para garantir navegação válida sem links quebrados.
- Mantidas as regras do briefing: radio para Para você/MEI, checkbox para Empresas, preço apresentado abaixo da seleção, sem valores inventados e sem checkout/WhatsApp fictícios.
- Validação final concluída: type-check, lint, Vitest e build aprovados.
