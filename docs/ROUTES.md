Roteamento e Convenções de Rotas
-------------------------------

Convenção
- Roteamento por feature: /projects, /accounting, /projects/:id
- Nome das rotas seguindo padrões: feature.action (ex: projects.list, projects.detail)

Lazy-loading
- Carregar rotas por feature via code-splitting

Proteção de rotas
- Guardas de rota (auth) a serem definidas quando houver serviço de autenticação


Rotas implementadas — 2026-09-13
- /: única rota pública atual. As convenções por feature acima continuam prospectivas.
- Âncoras: inicio, conteudo, sobre, solucoes, financeiro, contabilidade, fiscal, investimentos, automacao, processo, auditoria, tecnologia, equipe e contato.
- Header mobile fecha após seleção e Escape; link de pular conteúdo move foco para main.
- Não há rotas públicas de engenharia, autenticação ou módulos operacionais.
