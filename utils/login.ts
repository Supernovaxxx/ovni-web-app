import axios, { AxiosError } from "axios"
import { api } from "./axios-sdk"

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