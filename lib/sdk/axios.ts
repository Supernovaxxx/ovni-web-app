import axios from "axios"
import { getSession } from "next-auth/react"

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
})

api.interceptors.request.use(async (request) => {
    const session = await getSession()
    if (session) {
        request.headers.Authorization = `Bearer ${session.access}`
    }
    return request
})
