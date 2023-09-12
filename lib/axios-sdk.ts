import axios, { AxiosError } from "axios"
import { UserCredentials } from "@/types/user"
import { useQuery } from '@tanstack/react-query'
import { Token, UserInfo } from '@/types/user'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
})

export async function logIn(credentials: UserCredentials) {
    const response = await api.post(
        `/auth/login/`, {
        username: credentials.username,
        password: credentials.password
    }).catch(function (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.message)
        } else {
            error = new AxiosError('An unexpected error occurred')
        }
        return error
    })
    return response
}

export async function refreshToken(refreshToken: string) {
    const response = await api.post(
        'auth/token/refresh/', {
            refresh: refreshToken
        }
    ).catch(function (error){
        if (!axios.isAxiosError(error)) {
            error = new AxiosError('An unexpected error occurred')
        }
        return error
    })
    return response
}

export function getUserInfo(token: Token) {
    async function getUser() {
        const { data } = await api<UserInfo>(
            `/auth/me`,
            { headers: { Authorization: `Bearer ${token}` } }
        ).catch(function (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.message)
                } else {
                    error = new AxiosError('An unexpected error occurred')
                }
                return Promise.reject(error as AxiosError)
            })
        return data
    }
    return useQuery<UserInfo, AxiosError>({
        queryKey: ['getUser', token],
        queryFn: () => getUser(),
        staleTime: 600000,
    })
}
