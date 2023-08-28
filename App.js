import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './components/RootNavigator';
import { AuthProvider } from './components/AuthContext';
import DrawerNavigation from './components/DrawerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView style={styles.container}> */}
        <AuthProvider>
          <RootNavigator/>
        </AuthProvider>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}


