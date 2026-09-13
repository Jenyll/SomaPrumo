Auditoria e evolução da Home — 2026-09-13
========================================

Estado antes da implementação
- Branch: feat/frontend-foundation, alinhada ao origin. Nenhuma alteração staged.
- Nove arquivos modificados: PROJECT_STATE.md, docs/BRAND_GUIDELINES.md, docs/DESIGN_SYSTEM.md, docs/PROGRESS.md, Home.vue, shims-vue.d.ts, main.css, tsconfig.tsbuildinfo e vite.config.ts.
- Diretórios novos: src/assets, src/components, src/config e src/data.
- Alterações locais incluíam rebranding, assets oficiais, BrandLogo, TeamSection, PartnersCarousel, copy e alias @ no Vite.
- git status, git diff e git diff --staged executados antes de editar. Cópia adicional do estado local em /tmp/somaprumo-before-work.tar.gz; captura inicial em /tmp/somaprumo-before.png (arquivos temporários, não versionados).

Arquitetura inspecionada
- Vue 3, TypeScript, Vite, Router e Pinia, com uma rota pública (/).
- Application e Domain contêm contratos puros; infraestrutura tem repository/interface e mock de organizações. Não há operação real dos módulos.
- Home concentrava conteúdo e CSS; BrandLogo, TeamSection e PartnersCarousel já estavam extraídos.
- Fontes carregadas: Cormorant Garamond + Inter. Tokens tipográficos ainda apontavam para Garamond Premier Pro/EB Garamond e Suisse, com overrides conflitantes.

Gaps
- Visual: fundo claro quase contínuo, cards arredondados, gradientes e sombras fortes; dashboard ilustrativo no Hero; pouca hierarquia nos títulos de seção.
- Conteúdo: obras e medições expostas; percentuais e ganhos sem evidência; ausência dos quatro pilares, automação personalizada e auditoria fiscal; faixa rotulada como parceiros sem logos de clientes.
- UX: botões sem destino, nenhum footer, navegação mobile sem recolhimento e carrossel sem controle dos limites/reduced motion em JavaScript.
- Técnica: token shadow-soft autorreferente; retrato partner-1.svg com 5,59 MB; ausência de testes E2E e de navegador Playwright instalado.
- A referência Innovar traz fotografia grande, títulos serifados, superfícies escuras e respiro. Foi analisada sem copiar imagens, textos, logo ou composição literal.

Baseline
| Checagem | Resultado inicial |
| --- | --- |
| Type-check | Passou |
| Lint | Passou |
| Vitest | 1 teste passou |
| Build | Passou; JS 100,36 kB, CSS 14,04 kB (antes de gzip) |
| Playwright | Falhou com “No tests found”; nenhum teste implementado |

Execução incremental
1. Manter arquitetura, alias @ e assets oficiais; centralizar tokens e tipografia.
2. Extrair header com navegação funcional e substituir Hero ilustrativo pela composição editorial.
3. Adicionar problema/solução, pilares com detalhes, automação, metodologia, auditoria e tecnologia.
4. Reaproveitar seção/carrossel de equipe, corrigir conteúdo e controles; criar contato e footer.
5. Validar oito larguras, navegação, teclado, foco, imagens e reduced motion; atualizar documentação.

Resultado
- Sem referências públicas a engenharia/construção; contratos de domínio preservados para extensibilidade futura (ADR-010).
- Sem resultados, clientes, depoimentos ou integrações específicos inventados.
- Contato “loreimpus” solicitado pelo responsável, sem endpoint falso nem simulação de envio.
- 5 testes de componente e 10 E2E aprovados; type-check, lint e build aprovados.
- JS 110,57 kB (41,50 kB gzip); CSS 20,46 kB (4,67 kB gzip). Foto de Hero local de 181,11 kB.
- Original pesado da equipe permanece preservado e usa lazy loading. Otimização de derivados pode ser feita em etapa própria.
- Verificação binária confirmou que todos os assets oficiais de marca e equipe mantiveram o conteúdo original.
