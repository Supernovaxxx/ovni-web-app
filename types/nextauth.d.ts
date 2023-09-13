import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from "next-auth/jwt"
import { UserInfo } from '@/types/user'


interface AuthorizationResponse {
    access: string
    refresh: string
    user: UserInfo
}

declare module 'next-auth' {

    type User = AuthorizationResponse

    interface Session extends AuthorizationResponse {
        expires: number
    }
}

declare module "next-auth/jwt" {
    interface JWT extends AuthorizationResponse {
        expires: number
    }
}
