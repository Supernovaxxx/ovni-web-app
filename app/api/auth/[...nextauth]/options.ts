import type { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { logIn, refreshToken } from '@/lib/axios-sdk'

const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60
const BACKEND_REFRESH_TOKEN_LIFETIME = 60 * 60
const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000)
}

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Usuário:',
                    type: 'text'
                },
                password: {
                    label: 'Senha',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                const response = await logIn(credentials!)
                return (response.status === 200 ? response.data : null)
            }
        })
    ],
    callbacks: {
        async jwt({user, token}) {
            if (user) {
                token.user = user.user
                token.access_token = user.access
                token.refresh_token = user.refresh
                token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME
                return token
            }
            if (getCurrentEpochTime() > token.ref) {
                const response = await refreshToken(token.refresh_token)
                token.access_token = response.data.access
                token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME
            }
            return token
        },
        async session({token}) {
            return token as unknown as Session
        },
    }
}
