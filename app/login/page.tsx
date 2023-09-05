'use client'
import { useState } from "react"
import { useToken } from '../../hooks/useToken'
import { useRouter } from "next/navigation"
import { logIn } from "@/lib/axios-sdk"
import { UserCredentials } from "@/types/user"

export default function Page() {
    const { setToken } = useToken()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const credentials : UserCredentials = { username, password }

    async function handleLogIn(e: React.FormEvent) {
        e.preventDefault()
        const response = await logIn(credentials)
        if (response.status === 200) {
            const { access } = response.data
            setToken(access)
            router.push('/user')
        } else {
            alert(`${response.message} - ${response.response.statusText}`)
        }
    }

    return (
        <div className="flex items-center justify-center flex-col min-h-screen">
            <h1>Log in</h1>
            <form className="flex flex-col gap-1" onSubmit={handleLogIn}>
                <label htmlFor='username'>Username:</label>
                <input type='text' value={username} id='username' placeholder='Username' className="border-slate-200 border-2"
                    onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type='password' value={password} placeholder='Password' className="border-slate-200 border-2"
                    onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Send' className="bg-slate-400 text-white rounded p-1 mt-2 cursor-pointer" />
            </form>
        </div>
    )
}