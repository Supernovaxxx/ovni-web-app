import { useState } from 'react'

export function useToken() {
    const [ token, setTokenInternal ] = useState(() => {
        if(typeof window !== 'undefined'){ 
            return localStorage.getItem('token')
          }
    });

    function setToken(newToken: string) {
        localStorage.setItem('token', newToken)
        setTokenInternal(newToken)
    }

    return {token, setToken}
}