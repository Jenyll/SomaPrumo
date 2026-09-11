export type ModuleId = string

export type ModuleKind = 'accounting' | 'construction' | 'catalog' | 'dashboard'

export interface Module {
                    id: ModuleId
                    name: string
                    kind: ModuleKind
                    enabled: boolean
}
