import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { logIn, refreshToken } from '@/lib/axios-sdk'

const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60
const BACKEND_REFRESH_TOKEN_LIFETIME = 60 * 60

function getCurrentEpochTime() {
    return Math.floor(new Date().getTime() / 1000)
}

function getExpirationTime() {
    return getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME
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
                    label: 'Username:',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                const response = await logIn(credentials!)
                return (
                    response.status === 200
                        ? response.data
                        : null
                )
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    ...user,
                    expires: getExpirationTime()
                }
            }
            if (getCurrentEpochTime() > token.expires) {
                const response = await refreshToken(token.refresh)

                token.access = response.data.access
                token.expires = getExpirationTime()
            }
            return token
        },
        async session({ token }) {
            return token
        },
    }
}
