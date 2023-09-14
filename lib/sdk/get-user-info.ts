import { UserInfo } from "@/types/user"
import { api } from "./axios"
import axios, { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"

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
