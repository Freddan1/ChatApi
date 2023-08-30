import React, { useContext, useState } from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AuthContext } from './AuthContext';


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {handleRegister, messageInfo} = useContext(AuthContext)

  return (
    <>
    <View style={styles.container}>
      <TextInput 
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
      />
      
      <TextInput 
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      />
      <TouchableOpacity 
      style={styles.input} 
      onPress={() => handleRegister(username, password)}
      
      >
        <Text>Create</Text>
      </TouchableOpacity>
      {
        messageInfo && <Text>{messageInfo}</Text>
      }
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
  },
  message:{
    color: "red",
  }
});