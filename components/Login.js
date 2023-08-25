
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { AuthContext } from './AuthContext';

export default function Login( {navigation} ) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const {handleLogin} = useContext(AuthContext);


  return (
    <>
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
});