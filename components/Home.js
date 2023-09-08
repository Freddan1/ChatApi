import React, { useContext, useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native'
import { AuthContext } from './AuthContext'
import BottomSheet from './BottomSheet';


export default function Home() {

    const {accessToken,userID} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("")
    const [selectedMessage, setSelectedMessage] = useState(null)
    
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
        

        const sendMessage  = async (messageContent) => {
            try {
                const response = await fetch ('https://chat-api-with-auth.up.railway.app/messages',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        'content': messageContent
                    })
                })
                const data = await response.json();
                console.log(data)
      
                if(data.status === 201) {
                    handleMessages();
                    
                }
      
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(()=> {
            const interval = setInterval(()=> {
                handleMessages();
            },2000);
            return() => {
                clearInterval(interval)
            }
        },[])
        

        const renderMessages = ({item}) => {
            const isSent = item?.user?._id === userID
            const bubbleStyle = isSent ? styles.sentBubble : styles.receivedBubble;
            const handlePress = () => {
              if(isSent) {
                if (selectedMessage === item._id) {
                    setSelectedMessage(null)
                    console.log(item._id)
                }
                else {
                    setSelectedMessage(item._id)
                    console.log(item._id)
                }
              }  
            }
            
            return(
                <>
                <TouchableOpacity onPress={handlePress}>
                    <View 
                    style={[styles.messageContainer, isSent ? styles.sentContainer : styles.receivedContainer]} 
                    key={item._id}
                    >
                    <View style={[styles.messageBubble, bubbleStyle]}>
                        <Image 
                            source={{ uri: item?.user?.image }}
                            style={styles.userImage}
                            />
                        <Text style={styles.userName}>{item?.user?.username}</Text>
                        <Text style={styles.messageText}>{item.content}</Text>
                        <Text style={styles.messageDate}>{item.date}</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                
                </>
            )
        }
        const closeBottomSheet = () => {
            setSelectedMessage(null)
        }
        const flatListRef = useRef(null);

        return (
        <>
        <View style={{flex: 1}}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessages}
                keyExtractor={item => item._id}
                onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
            />
            <View style={styles.container}>
                <TextInput 
                style={styles.textfield}
                placeholder="Write something"
                value={content}
                onChangeText={setContent}
            
                />
                <TouchableOpacity 
                    style={styles.create} 
                    onPress={() => sendMessage(content) && (setContent(""))}
                    >
                    <Text>Send</Text> 
                </TouchableOpacity>
            </View>
            {
            selectedMessage !== null && (
                <BottomSheet
                    messageId={selectedMessage}
                    handleMessages={handleMessages}
                    onClose={closeBottomSheet}
                />
            )}
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
      },
      userImage: {
        height: 10,
        width: 10,
      }
  });