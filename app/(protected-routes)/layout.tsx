'use client'
import { useToken } from '../../hooks/useToken'
import { useUser } from '../../hooks/useUser'
import { useRouter } from "next/navigation"

export default function ProtectedLayout({ children, }: { children: React.ReactNode }) {
    const { token } = useToken()
    const { data, isFetching, error } = useUser(token)
    const router = useRouter()

    if (isFetching) {
        return <h1 className='p-8'>Loading...</h1>
    }
    if(error) {
        if (error.response!.status === 401) {
            setTimeout(() => { router.push('/login') }, 3000)
        }
        return <h1 className='p-8'>{error.message} - {error.response!.statusText}</h1>
    }
    if (data)
        return (
            <div>
                {children}
            </div>
        )
}