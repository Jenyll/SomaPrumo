import type { Organization } from '@/domain/organization/Organization'

export interface OrganizationRepository {
                    list(): Promise<Organization[]>
                    getById(id: string): Promise<Organization | null>
}
