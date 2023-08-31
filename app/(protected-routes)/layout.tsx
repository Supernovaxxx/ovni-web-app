'use client'
import { useRouter } from 'next/navigation'
import { useToken } from '../../hooks/useToken'
import { useUser } from '../../hooks/useUser'

export default function ProtectedLayout({ children, }: { children: React.ReactNode }) {
    const { token } = useToken()
    const router = useRouter()
    const { data, isFetching } = useUser(token)

    if (isFetching) {
        return <p className='p-8'>Loading...</p>
    }

    if (data)
        return (
            <div>
                {children}
            </div>
        )
}