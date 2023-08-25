'use client'
import { useRouter } from 'next/navigation'
import { useToken } from '../auth/useToken'
import { useUser } from '../auth/useUser'

export default function Page() {
    const {token, setToken} = useToken()
    const user = useUser()
    const router = useRouter()

    if (!token) return (router.push('/login'))

    return (
            <section className="flex flex-col w-60 p-10 gap-1">
                <h1 className="font-bold text-lg">User details</h1>
                <hr />
                <p>Username: {}</p>
                <p>Email: {}</p>
            </section>
    )
}