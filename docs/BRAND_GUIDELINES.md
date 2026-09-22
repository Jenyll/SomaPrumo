Brand Guidelines — SomaPrumo
============================

Direção aprovada em 2026-09-13
- Premium institucional, arquitetônica e editorial; tecnologia discreta.
- Assinatura: “Operações com clareza.”
- Posicionamento: Plataforma + Automação + Especialização.
- Descriptor comercial: Financeiro, contabilidade e fiscal. O descriptor incorporado ao logo oficial (“Contabilidade e gestão”) permanece intacto.

Tipografia (ADR-009, evolução do ADR-007)
- Cormorant Garamond: títulos e frases institucionais, pesos 400–600 e itálico pontual.
- Inter: texto, navegação, labels e botões.
- Fontes carregadas do Google Fonts com display=swap; fallbacks Garamond/Georgia e Segoe UI/Arial.
- A configuração única vive em `src/assets/styles/typography.css`.

Paleta institucional
- Charcoal: #171714, #1D1D19, #26241F.
- Bronze: #9B7650, #B08A62, #C6A27B.
- Sand: #D8C7B2, #E7DDD0.
- Ivory: #F3EFE8, #F8F5F0; branco #FFFFFF.
- Bronze de texto sobre fundos claros: #785635 para contraste.
- Cores centralizadas em `src/assets/styles/tokens.css`; componentes usam tokens semânticos.

Logo e imagens
- Assets oficiais em `src/assets/brand/` e `src/assets/team/` preservados byte a byte.
- Wordmark sobre superfície clara, com proporção preservada; sem filtros ou alterações ao SVG.
- Fotografia de planejamento reaproveitada da Home anterior, agora local em `src/assets/photos/process-meeting.jpg`.
- Origem da fotografia: https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85. Foto de contexto, sem atribuição à equipe SomaPrumo.
- Retratos de equipe mantidos com descrições de áreas de experiência, sem inventar nomes ou atribuir a uma pessoa a credencial de auditor fiscal.
- HTML de referência Innovar/Behance usado apenas para análise artística: contraste escuro, serifas, escala da fotografia e respiro. Nenhum asset ou texto da referência foi incorporado ao site.

Uso
- Alternar grandes superfícies charcoal, ivory e sand; bronze pontual.
- Divisórias, alinhamento e espaços estruturam a página; cards apenas para agrupamento funcional.
- Sem métricas, depoimentos, clientes ou integrações inventados. Engenharia não aparece na Home.
- Evitar gradientes ornamentais, sombras fortes, neon, glow e estética de dashboard.
