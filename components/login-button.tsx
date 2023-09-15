'use client'
import { useRouter } from 'next/navigation'


export interface LoginButtonProps extends React.PropsWithChildren {
    role: string
}

export default function LoginButton({ children, role }: LoginButtonProps) {
    const router = useRouter()
    return (
        <button
            className='bg-slate-500 text-white p-2 rounded'
            onClick={() => router.push(`/api/auth/${role}?callbackUrl=/user`)}
        >
            {children}
        </button>
    )
}
