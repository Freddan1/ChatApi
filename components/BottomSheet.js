import React, { useContext, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from './AuthContext';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function BottomSheet({messageId, handleMessages,onClose}) {
  const {accessToken} = useContext(AuthContext)

  const deleteMessage = async () => {
    try {
      const response = await fetch ('https://chat-api-with-auth.up.railway.app/messages/'+messageId,
      {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
      })
      const data = await response.json();
      
      console.log(data)

      if(data.status === 200) {
        handleMessages();
        onClose();
      }

  } catch (error) {
      console.log(error)
  }
  useEffect(()=> {
    handleMessages();
  })
}
  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.container}>
      <AntDesign name="delete" size={24} color="black" onPress={() => deleteMessage()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    bottomSheetContainer:{
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.3,
    borderRadius: 20,
   },
   container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    marginTop: 40
   }
})