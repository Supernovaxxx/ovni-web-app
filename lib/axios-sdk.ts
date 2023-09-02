import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
})


export interface UserCredentials {
    username: string,
    password: string
}

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