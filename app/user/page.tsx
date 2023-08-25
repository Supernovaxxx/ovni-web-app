'use client'
import { useUser } from '../auth/useUser';
import { useRouter } from 'next/navigation';
import { useToken } from '../auth/useToken';
import { REST_API_URL } from '@/variables';
import axios from 'axios';
import { useUserInfo } from '../auth/useUserInfo';

export default function Page() {
    const user = useUser();
    const {token, setToken} = useToken();
    const { user_id } = user;

    // const userInfo = async () => {
    //     const response = await axios.get(`${REST_API_URL}/auth/me/`, { headers: { Authorization: `Bearer ${token}`}});
    //     console.log(response)
    //     return response
    // }
    const userInfo = useUserInfo();
    console.log(userInfo);

    const router = useRouter();
    if (!user) return (router.push('/login'));

    return (
            <section className="flex flex-col w-60 p-10 gap-1">
                <h1 className="font-bold text-lg">User details</h1>
                <hr />
                <p>User ID: {user_id}</p>
                <p>Username: {}</p>
                <p>Email: {}</p>
            </section>
    )
}