import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import Settings from './Settings';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props}/>}
    >
      <Drawer.Screen name="Chat" component={Home} />
      <Drawer.Screen name="Settings" component={Settings}/>
    </Drawer.Navigator>
  );
}


export default AppNavigator;