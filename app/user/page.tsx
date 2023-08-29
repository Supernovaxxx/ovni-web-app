'use client'
import { useRouter } from 'next/navigation'
import { useToken } from '../auth/useToken'
import { useUser } from '../auth/useUser'

export default function Page() {
    const { token } = useToken()
    const { data, isLoading, isError, failureReason } = useUser()
    const router = useRouter()
    console.log(data)
    console.log(failureReason)

    if (!token) return (router.push('/login'))

    return (
            <section className="flex flex-col w-60 p-10 gap-1">
                <h1 className="font-bold text-lg">User info</h1>
                <hr />
                <div>
                    { isError ? 'An error occured' :
                        isLoading ? 'Loading...' : data &&
                    <>
                        <h2><strong>Username:</strong> {data.username}</h2>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>User ID:</strong> {data.pk}</p>
                        <p><strong>Name:</strong> {data.first_name} {data.last_name}</p>
                    </>
                    }
                </div>
            </section>
    )
}