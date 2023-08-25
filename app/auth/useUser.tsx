import { useToken } from './useToken'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function useUser() {
    const { token } = useToken()

    async function getUserInfo() {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REST_API_URL}/auth/me`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response
    }

    const [user, setUser] = useState(() => {
        if (!token) return ''
        return getUserInfo()
    })

    useEffect(() => {
        if (!token) setUser('')
        setUser(getUserInfo())
    }, [token])

    return user
}