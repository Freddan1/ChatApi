import React, { useContext } from 'react'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { AuthContext } from './AuthContext'
import DrawerNavigation from './DrawerNavigation'

export default function RootNavigator() {
  const {accessToken} = useContext(AuthContext)
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

