'use client'
import { LogButtonProps } from '@/types/components'
import { useRouter } from 'next/navigation'

export default function LogButton({children, role}: LogButtonProps) {
    const router = useRouter()
    return (
        <button
            onClick={() => router.push(`/api/auth/${role}?callbackUrl=/`)}
            className='bg-slate-500 text-white p-2 rounded'>
            {children}
        </button>
    )
}
