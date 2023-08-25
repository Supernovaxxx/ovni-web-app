'use client'
import { useState } from "react";
import { useToken } from '../auth/useToken';
import axios from 'axios';

export default function Page() {
    const [ token, setToken ] = useToken();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await axios.post('http://localhost:8000/api/auth/login/', {
            username: username,
            password: password
        });
        const { access } = response.data;
        setToken(access);
        console.log(token);
    }

    return (
        <div className="flex items-center justify-center flex-col min-h-screen">
            <h1>Log in</h1>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' value={username} id='username' placeholder='Username' className="border-slate-200 border-2"
                    onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type='password' value={password} placeholder='Password' className="border-slate-200 border-2"
                    onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Send' className="bg-slate-400 text-white rounded p-1 mt-2 cursor-pointer"/>
            </form>
        </div>
    )
}