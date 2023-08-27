import React, { useContext, useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from './AuthContext';


export default function Register({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {handleRegister} = useContext(AuthContext)

  return (
    <>
      <TextInput 
      style={styles.register}
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
      />
      
      <TextInput 
      style={styles.register}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.register} onPress={() => handleRegister(username, password)}>
        <Text>Create</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  register: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})