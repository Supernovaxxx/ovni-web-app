'use client'
import { useRouter } from 'next/navigation'
import { useToken } from '../auth/useToken'
import { useUser } from '../auth/useUser'

export default function ProtectedLayout({ children, }: { children: React.ReactNode }) {
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
            <div>
                {children}
            </div>
        )
}