import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import CameraView from './CameraView';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Settings() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarActiveBackgroundColor: "grey",
        tabBarShowLabel: false,
        tabBarIcon: ({}) => (
          <Feather name="user" size={24} color="black" />
        )
      }}/>
      <Tab.Screen name="Camera" component={CameraView} options={{
        tabBarActiveBackgroundColor: "grey",
        tabBarShowLabel: false,
        tabBarIcon:  ({}) => (
          <Ionicons name="camera" size={24} color="black" />
        )
        
      }}/>
    </Tab.Navigator>
  );
}


