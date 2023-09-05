import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { logIn } from '@/lib/axios-sdk'

export const options: NextAuthOptions = {
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
                return (response.status === 200 ? response.data.user : null) 
            }
        })
    ],
}