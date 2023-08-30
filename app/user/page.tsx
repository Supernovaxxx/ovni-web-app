'use client'
import { useRouter } from 'next/navigation'
import { useToken } from '../auth/useToken'
import { useUser } from '../auth/useUser'

export default function Page() {
    const { token } = useToken()
    const router = useRouter()
    const { data, error, isError, isFetching } = useUser(token)

    if (isFetching) {
        return <p className='p-8'>Loading...</p>
    }
    if (isError) {
        if (error.response && error.response.status === 401) {
            return router.push('/login')
        } 
        return (
            <>
                <p className='p-8'>Error:
                    {
                        error.message && error.response
                            ? <span>{error.message} - {error.response.statusText}</span>
                            : <span>{error.message}</span>
                    }
                </p>
            </>
        )
    }
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