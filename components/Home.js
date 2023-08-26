import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { AuthContext } from './AuthContext'


export default function Home() {

    const {handleLogout, accessToken} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    
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
                setMessages(data.data)
            }

                
        } catch (error) {
            console.log('error', error)
            }
        }
        useEffect(()=> {
            handleMessages();
        },[])
        
        const renderMessages = ({item}) => {
            return(
            <View style={styles.messages} key={item._id}>
                <Text>{item.date}</Text>
                <Text>{item.content}</Text>
            </View>
            )
        }

        return (
        <View style={{flex: 1, backgroundColor: "#fff",}}>
            <FlatList
                data={messages}
                renderItem={renderMessages}
                keyExtractor={item => item._id}
            />


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
    messages: {
        flex: 1,
    }
  });