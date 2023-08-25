import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import Home from './Home'

const Stack =createNativeStackNavigator()

export default function AppNavigator() {
  return (

    <Stack.Navigator>
      <Stack.Screen style={{flex: 1,}} name="Home" component={Home}/>
    </Stack.Navigator>
  )
}
