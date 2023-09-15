import axios, { AxiosError } from "axios"
import { api } from "./axios"

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
