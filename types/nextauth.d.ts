import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        access: string
        refresh: string
        user: {
            pk: number
            username: string
            email: string
            first_name?: string
            last_name?: string
        }
    }
    
    interface Session {
        user?: User 
    }
}
