import { api } from "./axios"
import axios, { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { EventsList } from "@/types/events"

export function getEventsList() {
    async function getList() {
        const { data } = await api<EventsList>(
            `/events/`,
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
    return useQuery<EventsList, AxiosError>({
        queryKey: ['getUser'],
        queryFn: () => getList(),
        staleTime: 600000,
    })
}
