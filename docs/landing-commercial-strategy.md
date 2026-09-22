# SomaPrumo — arquitetura comercial da landing

Este documento registra as decisões de UX, conteúdo, conversão e posicionamento aplicadas na landing institucional.

## Direção visual

A landing deve preservar uma linguagem premium, editorial, arquitetônica e tecnológica, sem aparência de SaaS genérico.

- Cormorant Garamond para títulos, momentos institucionais e hierarquia editorial.
- Inter para navegação, botões, formulários, preços e informações funcionais.
- Paleta charcoal, bronze, ivory e areia.
- Bronze como acento, não como cor dominante.
- Bordas finas, muito respiro, fotografia e composição editorial.
- Evitar excesso de cards, gradientes chamativos, neon, dashboards e clichês de IA.
- Animações discretas e compatíveis com `prefers-reduced-motion`.

## Aprendizados das auditorias

As auditorias apontaram principalmente:

1. CTA repetido com peso visual parecido em muitos pontos da página.
2. Navegação e orientação melhoráveis.
3. Ausência de sinais de confiança suficientemente visíveis.
4. Trechos com densidade textual acima do ideal para uma landing.
5. Hierarquia de informação irregular em algumas seções.
6. Necessidade de melhorar estados de foco, hover e interação.

A estética minimalista foi avaliada positivamente e deve ser preservada. O objetivo é refinamento, não redesign.

## Nova lógica comercial

A Home passa a funcionar como marca + roteamento + conversão.

Fluxo recomendado:

1. Hero
2. Sinais de confiança
3. Explorador de soluções e serviços
4. Problema e visão de plataforma
5. Soluções estruturais
6. Automação
7. Metodologia
8. Auditoria fiscal
9. Tecnologia e integração
10. Planos
11. Equipe
12. CTA final
13. Footer

## Segmentação

Em vez de PF x PJ apenas, a navegação comercial usa três portas:

### Para você

- Organização financeira
- Investimentos
- Patrimônio
- Informações fiscais

### MEI

- Abertura assistida
- Regularização
- Alteração cadastral
- Baixa
- Declaração anual
- DAS e obrigações
- Organização financeira

### Empresas

- Financeiro
- Contabilidade
- Fiscal
- Regularidade fiscal
- Abertura de empresa
- Alteração empresarial
- Baixa
- Auditoria e revisão fiscal
- Automação personalizada

## Inspirations úteis da Innovar

A referência da Innovar é usada para entender amplitude de demanda contábil e fiscal, não para copiar design.

Foram incorporadas ideias de negócio como:

- abertura, alteração e baixa de empresas;
- regularidade fiscal;
- revisão fiscal;
- serviços societários;
- organização de obrigações;
- serviço pontual separado da assinatura;
- entrada comercial pelo problema que o cliente precisa resolver.

A SomaPrumo deve transformar serviços tradicionais em uma experiência mais clara, organizada e digital.

## Explorador de soluções

O componente `SolutionsExplorer` substitui a lógica de múltiplos cards por uma lista editorial expansível.

O usuário escolhe `Para você`, `MEI` ou `Empresas` e navega por necessidades reais.

No desktop:

- hover e foco atualizam o painel de detalhes;
- clique mantém a seleção;
- cada linha informa se a oferta é `Serviço`, `Assinatura` ou `Especialista`.

No mobile:

- toque seleciona a linha;
- o painel de detalhes aparece abaixo da lista.

Isso reduz densidade visual e melhora escaneabilidade.

## Tipos de conversão

Nem toda oferta deve terminar no mesmo CTA.

### Serviço

Para necessidades pontuais, como abertura, baixa ou declaração.

### Assinatura

Para rotinas recorrentes, como organização financeira, DAS, obrigações e gestão.

### Especialista

Para auditoria, revisão fiscal, automação personalizada e casos complexos.

A landing passa a distinguir melhor `comprar`, `assinar` e `conversar`.

## Confiança

Não utilizar prova social fictícia, logos de clientes inexistentes, métricas inventadas ou certificações não comprovadas.

Sinais de confiança válidos usados na interface:

- Rastreabilidade
- Validação humana
- Processos definidos
- Conhecimento especializado
- Auditoria fiscal com profissional da área

Mensagem-chave:

> Automação com controle, não automação às cegas.

## MEI

Abertura de MEI deve ser apresentada como serviço assistido. A comunicação não deve sugerir que existe taxa pública de abertura nem afirmar que o SomaPrumo substitui processos oficiais.

Quando uma etapa depender de canal governamental, a interface deve deixar isso claro.

Estratégia comercial recomendada:

- abertura como aquisição;
- organização recorrente como assinatura;
- regularização e declaração como serviços pontuais;
- suporte e acompanhamento como camada premium.

## Planos

A landing apresenta categorias de planos sem inventar preço enquanto a definição comercial não estiver concluída.

Estrutura atual:

- Pessoal
- MEI
- Empresas

Possível evolução futura:

- Pessoal
- Pessoal+
- MEI Essencial
- MEI Assistido
- Gestão
- Gestão + Fiscal
- Automação
- Sob Medida

## Login

A rota `/login` existe como preview visual da futura área do cliente.

A tela não autentica, não envia e não armazena credenciais nesta fase. O backend de autenticação será conectado posteriormente.

## Próximas rotas planejadas

- `/pessoal`
- `/mei`
- `/empresas`
- `/planos`
- `/cadastro`
- `/checkout`
- `/app`

Também podem existir landing pages específicas para campanhas sociais, evitando enviar todo tráfego de TikTok e Instagram para a Home genérica.

## Tráfego de campanha

Sugestões futuras:

- `/anuncio/organizacao-financeira`
- `/anuncio/investimentos`
- `/anuncio/abrir-mei`
- `/anuncio/financeiro-empresarial`
- `/anuncio/automacao`
- `/anuncio/auditoria-fiscal`

## Regra de produto

A Home deve ajudar o visitante a responder rapidamente:

1. Isso é para mim?
2. O que consigo resolver aqui?
3. Posso contratar, assinar ou preciso falar com alguém?
4. Por que devo confiar?
5. Qual é o próximo passo?

Toda nova seção deve fortalecer uma dessas respostas. Se não fortalecer, provavelmente não precisa estar na landing.
