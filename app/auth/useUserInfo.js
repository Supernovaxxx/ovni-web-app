import { useUser } from './useUser';
import { useToken } from './useToken';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { REST_API_URL } from '@/variables';

export function useUserInfo() {
    const user = useUser();
    const [token] = useToken();

    const [userInfo, setUserInfo] = useState(() => {
        if (!user) return null;
        return getInfoFromUser()
    });

    async function getInfoFromUser() {
        const response = await axios.get(`${REST_API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}`}});
        setUserInfo(response);
    }

    useEffect(() => {
        getInfoFromUser()
    }, [token])

    return userInfo;
}