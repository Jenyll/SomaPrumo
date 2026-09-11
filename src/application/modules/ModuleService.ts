import type { Module } from '@/domain/module/Module'

export interface ModuleService {
                    list(): Promise<Module[]>
                    enable(id: string): Promise<Module | null>
}
