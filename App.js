import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './components/RootNavigator';
import { AuthContext, AuthProvider } from './components/AuthContext';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
