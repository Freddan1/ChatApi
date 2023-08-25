import React, { useContext, useEffect } from 'react'
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { AuthContext } from './AuthContext'


export default function Home() {

    const {handleLogout} = useContext(AuthContext);

    const {accessToken} = useContext(AuthContext)
    const handleMessages = async () => {

        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/messages',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const data = await response.json();

            if (data.status === 200){
                console.log(data.data)
            }

                
        } catch (error) {
            console.log('error', error)
            }
        }
        useEffect(()=> {
            handleMessages();
        },[])
        
        return (
        <View style={{flex: 1, backgroundColor: "#fff",}}>
            <TouchableOpacity 
            onPress={handleLogout}
            style={styles.input}
            >
            <Text>Logout</Text>
            </TouchableOpacity>
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
  });