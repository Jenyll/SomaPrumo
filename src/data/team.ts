import partner1 from '@/assets/team/partner-1.svg'
import partner2 from '@/assets/team/partner-2.svg'
import partner3 from '@/assets/team/partner-3.svg'

export interface TeamMember {
                    id: number
                    name: string
                    role: string
                    description: string
                    image: string
                    buttonLabel: string
}

export const teamMembers: TeamMember[] = [
                    {
                                        id: 1,
                                        name: 'Operação e processos',
                                        role: 'Contabilidade e fluxo de trabalho',
                                        description:
                                                            'Organiza os processos contábeis, validações e indicadores para reduzir retrabalho e aumentar a previsibilidade da rotina.',
                                        image: partner1,
                                        buttonLabel: 'Fale com um especialista',
                    },
                    {
                                        id: 2,
                                        name: 'Tecnologia e automação',
                                        role: 'Processos e soluções personalizadas',
                                        description:
                                                            'Conecta informações e estrutura automações de acordo com as etapas, regras e necessidades de cada operação.',
                                        image: partner2,
                                        buttonLabel: 'Fale com um especialista',
                    },
                    {
                                        id: 3,
                                        name: 'Tomada de decisão',
                                        role: 'Inteligência e acompanhamento',
                                        description:
                                                            'Transforma dados operacionais em visibilidade clara para gestão, liderança e controle financeiro de forma contínua.',
                                        image: partner3,
                                        buttonLabel: 'Fale com um especialista',
                    },
]
