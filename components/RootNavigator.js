import React from 'react'
import { Text, View } from 'react-native'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

export default function RootNavigator() {

    const accessToken = null
  return (
    <>
    {
        accessToken !== null
       ? <AppNavigator/>
       : <AuthNavigator/>
    }    
    </>
  )
}
