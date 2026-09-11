export type IntegrationId = string

export interface Integration {
                    id: IntegrationId
                    name: string
                    status: 'connected' | 'disconnected' | 'pending'
}
