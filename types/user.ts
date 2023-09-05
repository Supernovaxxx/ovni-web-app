export interface User {
    pk: number,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
}

export type Token = string | null | undefined

export interface UserCredentials {
    username: string,
    password: string
}