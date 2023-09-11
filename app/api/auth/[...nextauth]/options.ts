import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { logIn } from '@/lib/axios-sdk'

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
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
                token['user'] = user.user
                token['access_token'] = user.access
                token['refresh_token'] = user.refresh
                return token
            }
            return token
        },
        async session({token}) {
            return token
        },
    }
}
