export type AudienceKey = 'pessoal' | 'mei' | 'empresas'
export type OfferKind = 'Serviço' | 'Assinatura' | 'Especialista'

export interface CommercialOffer {
  id: string
  title: string
  description: string
  details: readonly string[]
  kind: OfferKind
  ctaLabel: string
  href: string
}

export interface CommercialAudience {
  key: AudienceKey
  label: string
  eyebrow: string
  intro: string
  offers: readonly CommercialOffer[]
}

export const commercialAudiences: readonly CommercialAudience[] = [
  {
    key: 'pessoal',
    label: 'Para você',
    eyebrow: 'Pessoa física',
    intro: 'Organização financeira, patrimônio e investimentos com mais clareza.',
    offers: [
      {
        id: 'pf-financeiro',
        title: 'Organizar minhas finanças',
        description: 'Centralize informações e acompanhe sua rotina financeira de forma simples.',
        details: ['Visão financeira', 'Organização de documentos', 'Acompanhamento da rotina'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer planos',
        href: '#planos',
      },
      {
        id: 'pf-investimentos',
        title: 'Organizar meus investimentos',
        description: 'Reúna posições, movimentações e informações relevantes do seu patrimônio.',
        details: ['Renda fixa', 'Renda variável', 'Moedas e posições'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer planos',
        href: '#planos',
      },
      {
        id: 'pf-patrimonio',
        title: 'Organizar meu patrimônio',
        description: 'Mantenha ativos, documentos e informações patrimoniais em uma visão organizada.',
        details: ['Bens e ativos', 'Documentos', 'Histórico organizado'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer planos',
        href: '#planos',
      },
      {
        id: 'pf-fiscal',
        title: 'Organizar informações fiscais',
        description: 'Prepare documentos e informações para suas obrigações com menos dispersão.',
        details: ['Documentos fiscais', 'Informações para declaração', 'Organização anual'],
        kind: 'Serviço',
        ctaLabel: 'Quero saber mais',
        href: '#contato',
      },
    ],
  },
  {
    key: 'mei',
    label: 'MEI',
    eyebrow: 'Microempreendedor individual',
    intro: 'Resolva formalização, obrigações e organização do seu negócio sem complicar o que pode ser simples.',
    offers: [
      {
        id: 'mei-abertura',
        title: 'Abrir meu MEI',
        description: 'Orientação, conferência de informações e acompanhamento da formalização.',
        details: ['Orientação inicial', 'Conferência de dados', 'Acompanhamento do processo'],
        kind: 'Serviço',
        ctaLabel: 'Solicitar serviço',
        href: '#contato',
      },
      {
        id: 'mei-regularizar',
        title: 'Regularizar meu MEI',
        description: 'Identifique pendências e organize o que precisa ser resolvido.',
        details: ['Pendências e obrigações', 'DAS em atraso', 'Próximos passos'],
        kind: 'Serviço',
        ctaLabel: 'Regularizar meu MEI',
        href: '#contato',
      },
      {
        id: 'mei-alterar',
        title: 'Alterar dados do MEI',
        description: 'Apoio para organizar alterações cadastrais e informações do negócio.',
        details: ['Dados cadastrais', 'Atividades', 'Informações do negócio'],
        kind: 'Serviço',
        ctaLabel: 'Solicitar alteração',
        href: '#contato',
      },
      {
        id: 'mei-baixa',
        title: 'Dar baixa no MEI',
        description: 'Acompanhamento para encerrar o cadastro e organizar as etapas posteriores.',
        details: ['Orientação de baixa', 'Conferência', 'Pós-encerramento'],
        kind: 'Serviço',
        ctaLabel: 'Solicitar baixa',
        href: '#contato',
      },
      {
        id: 'mei-dasn',
        title: 'Declaração anual',
        description: 'Organize as informações necessárias para a obrigação anual do MEI.',
        details: ['Faturamento', 'Documentos', 'Acompanhamento da obrigação'],
        kind: 'Serviço',
        ctaLabel: 'Quero ajuda',
        href: '#contato',
      },
      {
        id: 'mei-das',
        title: 'DAS e obrigações',
        description: 'Acompanhe vencimentos, documentos e obrigações recorrentes do seu MEI.',
        details: ['Calendário', 'Alertas', 'Organização de comprovantes'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer plano MEI',
        href: '#planos',
      },
      {
        id: 'mei-financeiro',
        title: 'Organizar meu financeiro',
        description: 'Separe a rotina pessoal da operação do negócio e acompanhe faturamento e movimentações.',
        details: ['Faturamento', 'Entradas e saídas', 'Organização financeira'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer plano MEI',
        href: '#planos',
      },
    ],
  },
  {
    key: 'empresas',
    label: 'Empresas',
    eyebrow: 'PJ e operações em crescimento',
    intro: 'Estruture financeiro, contabilidade, fiscal e automação com controle e rastreabilidade.',
    offers: [
      {
        id: 'pj-financeiro',
        title: 'Organizar o financeiro',
        description: 'Estruture rotinas, informações e controles para reduzir dependência de processos manuais.',
        details: ['Contas e movimentações', 'Conciliação', 'Controle operacional'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer soluções',
        href: '#solucoes',
      },
      {
        id: 'pj-contabilidade',
        title: 'Organizar a contabilidade',
        description: 'Conecte documentos, classificações, conciliações e fechamento em um fluxo mais claro.',
        details: ['Plano de contas', 'Centros de custo', 'Fechamento'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer soluções',
        href: '#solucoes',
      },
      {
        id: 'pj-fiscal',
        title: 'Organizar o fiscal',
        description: 'Acompanhe obrigações, tributos, documentos e validações com mais contexto.',
        details: ['Obrigações', 'Documentos fiscais', 'Validação e evidências'],
        kind: 'Assinatura',
        ctaLabel: 'Conhecer soluções',
        href: '#solucoes',
      },
      {
        id: 'pj-regularidade',
        title: 'Regularidade fiscal',
        description: 'Tenha uma visão organizada de pendências, acompanhamento e pontos que precisam de atenção.',
        details: ['Situação fiscal', 'Pendências', 'Acompanhamento'],
        kind: 'Especialista',
        ctaLabel: 'Falar com especialista',
        href: '#contato',
      },
      {
        id: 'pj-abertura',
        title: 'Abrir uma empresa',
        description: 'Apoio para estruturar a abertura e organizar as informações necessárias.',
        details: ['Diagnóstico inicial', 'Estrutura do negócio', 'Acompanhamento'],
        kind: 'Serviço',
        ctaLabel: 'Solicitar abertura',
        href: '#contato',
      },
      {
        id: 'pj-alteracao',
        title: 'Alterar uma empresa',
        description: 'Organize mudanças cadastrais e societárias com acompanhamento especializado.',
        details: ['Dados cadastrais', 'Alterações societárias', 'Documentação'],
        kind: 'Serviço',
        ctaLabel: 'Solicitar alteração',
        href: '#contato',
      },
      {
        id: 'pj-baixa',
        title: 'Baixar uma empresa',
        description: 'Conduza o encerramento com organização documental e acompanhamento das etapas.',
        details: ['Diagnóstico', 'Documentação', 'Acompanhamento'],
        kind: 'Serviço',
        ctaLabel: 'Solicitar baixa',
        href: '#contato',
      },
      {
        id: 'pj-auditoria',
        title: 'Auditoria e revisão fiscal',
        description: 'Análise especializada de inconsistências, riscos, evidências e oportunidades de melhoria.',
        details: ['Revisão fiscal', 'Riscos e inconsistências', 'Evidências'],
        kind: 'Especialista',
        ctaLabel: 'Falar com especialista',
        href: '#contato',
      },
      {
        id: 'pj-automacao',
        title: 'Automatizar um processo',
        description: 'Mapeamos a rotina antes de automatizar para preservar controle, exceções e validação humana.',
        details: ['Mapeamento', 'Automação personalizada', 'Controle e rastreabilidade'],
        kind: 'Especialista',
        ctaLabel: 'Falar sobre automação',
        href: '#contato',
      },
    ],
  },
] as const
