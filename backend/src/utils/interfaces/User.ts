export interface User {
    userId: string | null,
    userActivationToken: string | null,
    userEmail: string,
    userHash: string
}