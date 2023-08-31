import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native'
import { AuthContext } from './AuthContext'
import BottomSheet from './BottomSheet';


export default function Home() {

    const {accessToken,userID} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("")
    
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
        

        const sendMessage  = async (content) => {
            try {
                const respone = await fetch ('https://chat-api-with-auth.up.railway.app/messages',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        'content': content
                    })
                })
                const data = respone.json();
                
      
                if(data.status === 201) {
                    // handleMessages();
                }
      
            } catch (error) {
                console.log(error)
            }
        }
        
        useEffect(()=> {
            handleMessages();
        },)

        const renderMessages = ({item}) => {
            const isSent = item?.user?._id === userID
            const bubbleStyle = isSent ? styles.sentBubble : styles.receivedBubble;
            return(
                <View style={[styles.messageContainer, isSent ? styles.sentContainer : styles.receivedContainer]} key={item._id}>
                <View style={[styles.messageBubble, bubbleStyle]}>
                    <Text style={styles.userName}>{item?.user?.username}</Text>
                    <Text style={styles.messageText}>{item.content}</Text>
                    <Text style={styles.messageDate}>{item.date}</Text>
                </View>
            </View>
            )
        }

        return (
        <>
        <View style={{flex: 1}}>
            <FlatList
                data={messages}
                renderItem={renderMessages}
                keyExtractor={item => item._id}
            />
            <View style={styles.container}>
                <TextInput 
                style={styles.textfield}
                placeholder="Write something"
                value={content}
                onChangeText={setContent}
            
                />
                <TouchableOpacity style={styles.create} onPress={() => sendMessage(content) && (setContent(""))}>
                    <Text>Send</Text> 
                </TouchableOpacity>
            </View>
        </View>
        {/* <BottomSheet/> */}
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
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    sentContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    receivedContainer: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
    },
    sentBubble: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    receivedBubble: {
        backgroundColor: 'white',
        alignSelf: 'flex-start'
    },
    messageText: {
        fontSize: 14,
    },
    messageDate: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        color: '#888'
    },
    userName: {
        fontSize: 10,
    },
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
  });