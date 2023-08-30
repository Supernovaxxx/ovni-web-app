'use client'
import { useToken } from "@/app/auth/useToken"
import { useUser } from "@/app/auth/useUser"

export default function Page() {
    const { token } = useToken()
    const { data } = useUser(token)

    if (data)
        return (
            <div className="p-8 flex flex-col gap-2">
                <h1 className="text-lg font-bold">User info</h1>
                <hr />
                <p><strong>Username:</strong> {data.username}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Name:</strong> {data.first_name} {data.last_name}</p>
                <p><strong>User ID</strong> {data.pk}</p>
            </div>
        )
}