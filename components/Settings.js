import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Camera from './Camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Settings() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Camera" component={Camera} />
    </Tab.Navigator>
  );
}
export default Settings