'use client'
import { useSession } from 'next-auth/react'
import { getUserInfo } from '@/lib/axios-sdk'
import { Token } from '@/types/user'

export default function Page() {
    // To-do: isolate session token retrieving in another file and resolve type
    const session: any = useSession()
    const accessToken: Token = session.data?.access_token
    const meData = getUserInfo(accessToken)

    if (meData && meData.data)
    return (
        <div className="p-8 flex flex-col gap-2">
            <h1 className="text-lg font-bold">User info:</h1>
            <hr />
            <p>User email: {meData.data.email}</p>
            <p>Username: {meData.data.username}</p>
        </div>
    )
}
