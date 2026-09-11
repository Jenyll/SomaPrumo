export interface DashboardService {
                    getSummary(): Promise<{ totalModules: number; activeModules: number }>
}
