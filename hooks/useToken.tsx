import { useState } from 'react'

export function useToken() {
    const [ token, setTokenInternal ] = useState(() => {
        return localStorage.getItem('token')
    });

    function setToken(newToken: string) {
        localStorage.setItem('token', newToken)
        setTokenInternal(newToken)
    }

    return {token, setToken}
}