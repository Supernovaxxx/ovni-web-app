'use client'
import { useUser } from '../auth/useUser'
import { useRouter } from 'next/navigation'
import { useToken } from '../auth/useToken'
import { useUserInfo } from '../auth/useUserInfo'

export default function Page() {
    const user = useUser()
    const {token, setToken} = useToken()
    const { user_id } = user
    const userInfo = useUserInfo()
    const router = useRouter()

    if (!user) return (router.push('/login'))

    return (
            <section className="flex flex-col w-60 p-10 gap-1">
                <h1 className="font-bold text-lg">User details</h1>
                <hr />
                <p>User ID: {user_id}</p>
                <p>Username: {}</p>
                <p>Email: {}</p>
            </section>
    )
}