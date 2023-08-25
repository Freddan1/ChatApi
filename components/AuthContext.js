import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const  AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    console.log(accessToken)

    const handleLogin = async(username, password) => {
        console.log('hej')

        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/auth/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            })
            const data = await response.json()

            if (data.status === 200){
                await AsyncStorage.setItem('accessToken', data.data.accessToken)
                setAccessToken(data.data.accessToken)
            }
            else{
                console.log('fel')
            }

        } catch(error){
            console.log(error)
        }
    }

    const register = async (username, password) => {
        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            })
            // const data = await response.json()  Ej klar med detta

        } catch (error) {
            console.log(error)
        }
    }
            


    const handleLogout = async () => {
        console.log('handleLogout')

        try {
            await AsyncStorage.removeItem('accessToken')
            setAccessToken(null)
        } catch (error) {
            console.log(error)
        }
    }

    const isLogedIn = async () => {
        console.log('IsloggedIn')

        try {
            const token = await AsyncStorage.getItem('accessToken')
            setAccessToken(token)
        } catch (error){
            console.log(error)
        }
    }
        
    useEffect(()=> {
        isLogedIn()
    },[])
    
    return(
        <AuthContext.Provider value={{handleLogin, accessToken, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}
 
            
            
            



