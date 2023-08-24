import React, { useContext } from 'react'
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from './AuthContext'

export default function AuthNavigator() {
    const {accessToken, handleLogin} = useContext(AuthContext)


  return (
    <>
        <Text>AuthNavigator</Text>
        <TouchableOpacity onPress={() => handleLogin()}>
            <Text>Login</Text>
        </TouchableOpacity>

    </>
  )
}
