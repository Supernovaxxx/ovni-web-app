'use client'
import { UserInfo } from "@/types/user"
import { useSession } from "next-auth/react"


export function useUser() {
    const { data: session, status } = useSession()

    const isLoading = status === 'loading'
    const user = session?.user as UserInfo | undefined

    return { user, isLoading }
}
