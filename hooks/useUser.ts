import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios-sdk'
import { User, Token } from '../types/user'

export function useUser(token: Token) {
    async function getUser(token: Token) {
        const { data } = await api<User>(
            `/auth/me`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch(function (error) {
            if (axios.isAxiosError(error)){
                console.log(error.message)
            } else {
                error = new AxiosError('An unexpected error occurred')
            }
            return Promise.reject(error as AxiosError)
        })
        return data
    }
    return useQuery<User, AxiosError>({
        queryKey: ['getUser', token],
        queryFn: () => getUser(token),
        staleTime: 600000,
    })
}