Design System — landing institucional
=====================================

Fontes de verdade
- `src/assets/styles/tokens.css`: paleta, texto, contraste, bordas, container, margens e espaçamento.
- `src/assets/styles/typography.css`: Cormorant Garamond + Inter (ADR-009).
- `src/styles/main.css`: reset, utilitários de seção, botões, foco e reduced motion.
- `src/config/brand.ts`: marca, copy institucional, links e contato.

Composição
- Container máximo de 1280 px; margens fluidas de 24 a 80 px; seções entre 64 e 112 px de respiro.
- Hero charcoal com foto editorial e títulos serifados; header claro para acomodar o wordmark oficial.
- Pilares em grade aberta 2×2, com detalhes nativos (`details`/`summary`).
- Automação e tecnologia em charcoal; metodologia e contato em sand; auditoria e equipe em ivory.
- Botões principais bronze em fundo escuro; charcoal em fundo claro. CTA principal “Fale com um especialista”; secundário “Conheça as soluções”.

Responsividade
- Abaixo de 1024 px: navegação recolhível e equipe em trilho horizontal com controles.
- Abaixo de 768 px: composições em uma coluna, metodologia em lista vertical e faixa de pilares em duas colunas.
- Até 600 px: equipe mostra um perfil e parte do próximo para indicar navegação lateral.
- Fotos possuem dimensões declaradas; retratos usam lazy loading; Hero usa fetchpriority=high.

Acessibilidade
- Link de pular conteúdo, único h1, landmarks, seções nomeadas e âncoras válidas.
- Navegação com aria-expanded, Escape e retorno de foco; botões e links com alvos de pelo menos 44 px.
- Carrossel navegável por teclado e toque, com botões desabilitados nos limites.
- Foco visível claro/escuro. prefers-reduced-motion desativa scroll suave e transições; carrossel também consulta a preferência antes de mover.
- Contrastes calculados: bronze de texto em ivory 6,07:1 e em sand 4,92:1; texto secundário em sand 4,65:1; texto secundário claro no painel escuro 7,30:1; texto charcoal sobre CTA bronze 7,57:1.
- Verificação funcional e visual descrita em `docs/TESTING.md`; não representa certificação integral WCAG.

Compatibilidade
- Aliases antigos de tokens mantidos para componentes existentes; removida autorreferência inválida de shadow-soft.
- Sem nova biblioteca de UI, animação ou dependência de domínio.
