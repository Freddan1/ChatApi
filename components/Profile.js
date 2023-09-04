import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { AuthContext } from './AuthContext'

export default function Profile(username) {

  const {accessToken, handleLogout} = useContext(AuthContext)
  const [messageInfo, setMessageInfo] = useState("")

  const fetchUser = async () => {
    try {
      const response = await fetch ('https://chat-api-with-auth.up.railway.app/users',
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      const data = await response.json()


      console.log(data, "Data?")

    } catch(error) {
      console.log(error)
    }
  }
  fetchUser()
  const deleteUser = async () => {
    setMessageInfo("")
    try {
      const response = await fetch ('https://chat-api-with-auth.up.railway.app/users',
      {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
      })
      const data = await response.json();

      if(data.status === 200) {
        setMessageInfo(<Text style = {{color: 'green'}}>Account deleted</Text>)
        setTimeout(() => {
          handleLogout()
        },2000)
      }

  } catch (error) {
      console.log(error)
  }

}

  return (
    <View style={styles.container}>
      
      <TextInput
          placeholder="User name"
          style={styles.input}
          // value={user}
          // onChangeText={setUsername}

        />
      <TextInput
          placeholder="First name"
          style={styles.input}
          // value={username}
          // onChangeText={setUsername}

        />
        <TextInput
          placeholder='Last name'
          style={styles.input}
          // value={password}
          // onChangeText={setPassword}
        />
          
        <TouchableOpacity style={styles.input} 
        onPress={() => handleLogin(username, password)}
        
        >
            <Text>Add full name to profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputDelete} onPress={() => deleteUser()}>
            <Text>Delete account</Text>
        </TouchableOpacity>
        {
          messageInfo && <Text>{messageInfo}</Text>
        }
        </View>
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
  inputDelete: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "red"
  }

});