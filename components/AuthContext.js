import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const  AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState("")

    const handleLogin = async(username, password) => {

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
    
    const handleRegister = async (username, password) => {
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
            const data = await response.json()

            if(data.status === 200){
                const token = await AsyncStorage.getItem('accessToken')
                setAccessToken(token)
            }

        } catch (error) {
            console.log(error)
        }
    }
            
    const sendMessage  = async (content) => {
        try {
            const respone = await fetch ('https://chat-api-with-auth.up.railway.app/messages',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    'content': content
                })
            })
            const data = respone.json();

            if(data.status === 201) {
                console.log(content)
            }

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
        <AuthContext.Provider value={{handleLogin, accessToken, handleLogout, handleRegister, isLogedIn, sendMessage}}>
            {children}
        </AuthContext.Provider>
    )
}
 
            
            
            



