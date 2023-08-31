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
    const router = useRouter()
    useEffect(() => {
        console.error(error)
        if (error.response!.status === 401) {
            setTimeout(() => { router.push('/login') }, 3000)
        }
    }, [error])

    return (
        <div className='p-8'>
            {
                error.message && error.response && error.response.status === 401
                    ? <div className='w-3/6'>
                        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*aVNnrrTMkCzcY3eJ.jpg" alt="Error 401 - Authorization required" />
                        <span>Redirecting...</span>
                        </div>
                    : <>
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
                    </>
            }
        </div>
    )
}