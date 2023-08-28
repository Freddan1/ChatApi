import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import AppNavigator from './AppNavigator';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;