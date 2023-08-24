import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const  AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);

    const handleLogin = async () => {

        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/auth/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: "Freddan",
                    password: "123"
                })
            })
            const data = await response.json();
            console.log("handleLogin")
            console.log(data)
            
            await AsyncStorage.setItem('accesToken', data.data.accessToken)
            setAccessToken(data.data.accessToken)
            
    } catch (error) {
        console.log('error', error)
        }
    }
    useEffect(()=> {
        handleLogin()
    },[])

    return(
        <AuthContext.Provider value={{handleLogin, accessToken}}>
            {children}
        </AuthContext.Provider>
    )
}


