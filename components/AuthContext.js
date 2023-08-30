import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'react-native';

export const AuthContext = createContext();

export const  AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [userID, setUserID] = useState("")
    const [messageInfo, setMessageInfo] = useState("")

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
                setUserID(data.data._id)
            }
            else{
                console.log('fel')
            }

        } catch(error){
            console.log(error)
        }
    }
    
    const handleRegister = async (username, password) => {
        setMessageInfo("")
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
                setMessageInfo(<Text style = {{color: 'green'}}>{data.message}</Text>)
                setTimeout(()=> {
                    setMessageInfo("")
                },3000)
            }
            if(data.status === 409) {
                setMessageInfo(<Text style = {{color: 'red'}}>{data.message}</Text>)
                setTimeout(()=> {
                    setMessageInfo("")
                },3000)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        setMessageInfo()
    },[])
            

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
        <AuthContext.Provider value={{handleLogin, accessToken, handleLogout, handleRegister, isLogedIn, userID, messageInfo}}>
            {children}
        </AuthContext.Provider>
    )
}
 
            
            
            



