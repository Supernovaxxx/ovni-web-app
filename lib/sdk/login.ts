import { UserCredentials } from "@/types/user"
import { api } from "./axios"
import axios, { AxiosError } from "axios"

export async function logIn(credentials: UserCredentials) {
    const response = await api.post(`/auth/login/`, credentials)
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            } else {
                error = new AxiosError('An unexpected error occurred')
            }
            return error
        })
    return response
}
