'use client'
import { useUser } from "@/hooks"


export default function UserData() {
    const { user, isLoading } = useUser()

    if (isLoading) return (
        <div className="p-8 flex flex-col gap-2">
            Loading...
        </div>
    )

    if (user) return (
        <div className="p-8 flex flex-col gap-2">
            <h1 className="text-lg font-bold">User info:</h1>
            <hr />
            <p>User email: {user.email}</p>
            <p>Username: {user.username}</p>
        </div>
    )
    else return (
        <div className="p-8 flex flex-col gap-2">
            Not Authenticated!
        </div>
    )
}
