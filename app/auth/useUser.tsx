import { useToken } from './useToken'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export interface User {
    pk: number,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
}

export function useUser() {
    const { token } = useToken()
    const [user, setUser] = useState<User>()

    const { data, isLoading, isError, failureReason } = useQuery({
        queryKey: ['UserInfo'], // this is for caching. not sure how to use it yet
        queryFn: async () => {
            const { data } = await axios.get<User>(
                `${process.env.NEXT_PUBLIC_REST_API_URL}/auth/me`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            return data as User
        },
    })

    useEffect(() => {
        setUser(data)
    }, [token])

    return { data, isLoading, isError, failureReason }
}