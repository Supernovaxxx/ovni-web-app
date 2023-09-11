import NextAuth from 'next-auth'
import { JWT } from "next-auth/jwt"

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

declare module "next-auth/jwt" {
    interface JWT {
        access_token: string
        refresh_token: string
        user: {
            pk: number
            username: string
            email: string
            first_name?: string
            last_name?: string
        }
        ref: number
    }
}
