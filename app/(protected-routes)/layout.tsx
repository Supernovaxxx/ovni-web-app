'use client'
import { useToken } from '../../hooks/useToken'
import { useUser } from '../../hooks/useUser'

export default function ProtectedLayout({ children, }: { children: React.ReactNode }) {
    const { token } = useToken()
    const { data } = useUser(token)

    if (data)
        return (
            <div>
                {children}
            </div>
        )
}