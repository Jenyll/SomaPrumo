import type { Organization } from '@/domain/organization/Organization'

export interface OrganizationService {
                    list(): Promise<Organization[]>
                    getById(id: string): Promise<Organization | null>
}
