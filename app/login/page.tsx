'use client'
import { useState } from "react";

export default function Page() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        alert('form sent!')
    }

    return (
        <div className="flex items-center justify-center flex-col min-h-screen">
            <h1>Log in</h1>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' placeholder='Username' className="border-slate-200 border-2"
                    onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type='password' placeholder='Password' className="border-slate-200 border-2"
                    onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Send' className="bg-slate-400 text-white rounded p-1 mt-2"/>
            </form>
        </div>
    )
}