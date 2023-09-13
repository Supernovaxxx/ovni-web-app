import axios, { AxiosError } from "axios"
import { UserCredentials } from "@/types/user"
import { useQuery } from '@tanstack/react-query'
import { UserInfo } from '@/types/user'
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
})

api.interceptors.request.use(async (request) => {
    const session = await getServerSession(options)
    if (session) {
        request.headers.Authorization = `Bearer ${session.access}`
    }
    return request
})

export async function logIn(credentials: UserCredentials) {
    const response = await api.post(`/auth/login/`, credentials)
        .catch(function (error) {
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
    ).catch(function (error) {
        if (!axios.isAxiosError(error)) {
            error = new AxiosError('An unexpected error occurred')
        }
        return error
    })
    return response
}

export function getUserInfo() {
    async function getUser() {
        const { data } = await api<UserInfo>(
            `/auth/me`,
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
        queryKey: ['getUser'],
        queryFn: () => getUser(),
        staleTime: 600000,
    })
}
