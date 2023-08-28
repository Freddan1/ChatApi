import React, { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native'


export default function SendChat() {
    const {sendMessage} = useContext(AuthContext)
    const [content, setContent] = useState("")

  return (
    <>
        <TextInput 
        style={styles.register}
        placeholder="Write something"
        value={content}
        onChangeText={setContent}
        />
        <TouchableOpacity style={styles.register} onPress={() => sendMessage(content)}>
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