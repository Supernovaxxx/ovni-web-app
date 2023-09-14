import { options } from "@/app/api/auth/[...nextauth]/options"
import axios from "axios"
import { getServerSession } from "next-auth/next"

export const api = axios.create({
    baseURL: process.env.REST_API_URL,
})

api.interceptors.request.use(async (request) => {
    const session = await getServerSession(options)
    if (session) {
        request.headers.Authorization = `Bearer ${session.access}`
    }
    return request
})
