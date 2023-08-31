'use client'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: AxiosError
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])
    const router = useRouter()
    return (
        <div className='p-8'>
            <h2>Something went wrong!</h2>
            <p>Error:
                {
                    error.message && error.response
                        ? <span> {error.message} - {error.response.statusText}</span>
                        : <span> {error.message}</span>
                }
            </p>
            <button className="border-2 p-2 rounded border-slate-800" onClick={() => reset()}>
                Try again
            </button>
            <button className="border-2 p-2 rounded border-slate-800" onClick={() => router.push('/login')}>
                Log in
            </button>
        </div>
    )
}