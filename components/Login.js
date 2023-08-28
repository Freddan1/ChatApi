
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from './AuthContext';

export default function Login( {navigation} ) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {handleLogin} = useContext(AuthContext);

  return (
    <>
    <View style={styles.container}>
      
      <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}

        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
          
        <TouchableOpacity style={styles.input} onPress={() => handleLogin(username, password)}>
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('Register')}>
            <Text>Or register</Text>
        </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});