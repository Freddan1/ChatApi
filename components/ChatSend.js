import React, { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native'

export default function ChatSend() {
    const {sendMessage} = useContext(AuthContext)
    const [content, setContent] = useState("")

  return (
    <>
    <View style={styles.container}>
        <TextInput 
        style={styles.textfield}
        placeholder="Write something"
        value={content}
        onChangeText={setContent}
        
        />
        <TouchableOpacity style={styles.create} onPress={() => sendMessage(content)}>
            <Text>Send</Text> 
        </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    textfield: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: 250,
      height: 40,
      margin: 11,
      borderWidth: 1,
      padding: 10,
    },
    container: {
        flexDirection: "row"
    },
    create: {
        justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: 60,
      height: 40,
      margin: 11,
      borderWidth: 1,
      padding: 10,
    }
  })