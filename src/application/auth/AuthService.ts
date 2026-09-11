import type { Result } from '@/core/result/Result'

export interface AuthService {
                    signIn(email: string, password: string): Promise<Result<{ email: string }>>
                    signOut(): Promise<void>
}
