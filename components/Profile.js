import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { AuthContext } from './AuthContext'

export default function Profile() {

  const {accessToken, handleLogout} = useContext(AuthContext)
  const [messageInfo, setMessageInfo] = useState("")
  const [usernameData, setUsernameData] = useState({username: '', firstname: '', lastname: ''})

  const fetchUser = async (firstname, lastname) => {
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

      setUsernameData({
        username: data.data.username,
        firstname: data.data.firstname,
        lastname: data.data.lastname
      });

    } catch(error) {
      console.log(error)
    }
  }
  
  
  const updateUser = async () => {
    try{
      const response = await fetch ('https://chat-api-with-auth.up.railway.app/users',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          firstname: usernameData.firstname, 
          lastname: usernameData.lastname
        }),
      });
      
      const data = await response.json()
      if(data.status === 200){
        setMessageInfo(<Text style={{color: "green"}}>User information has been updated</Text>)
        fetchUser() 
        setTimeout(()=> {
          setMessageInfo("");
        },1500)
      }
    } catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUser()
  },[])

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
          value={usernameData.username}
          onChangeText={(text) => setUsernameData({...usernameData, username: text})}

        />
      <TextInput
          placeholder="First name"
          style={styles.input}
          value={usernameData.firstname}
          onChangeText={(text) => setUsernameData({...usernameData, firstname: text})}

        />
        <TextInput
          placeholder='Last name'
          style={styles.input}
          value={usernameData.lastname}
          onChangeText={(text) => setUsernameData({...usernameData, lastname: text})}
        />
          
        <TouchableOpacity style={styles.input} onPress={() => updateUser()}>
          <Text>Update user information</Text>
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