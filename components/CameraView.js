import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import ImagePreview from './ImagePreview';
import { useIsFocused } from '@react-navigation/native';




export default function CameraView() {
  const isFocused = useIsFocused()

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [picture, setPicture] = useState(null)
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState(FlashMode.off)
  const cameraRef = useRef(null)

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  function toggleFlash() {
    setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  } 

  const takePicture = async () => {
    if(cameraRef.current) {
      try{
        const picture = await cameraRef.current.takePictureAsync()
        setPicture(picture)
        console.log(picture)
      } catch(error){
        console.log(error)
      }
    }
  }

  useEffect(()=> {
    (async ()=> {
      const CameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(CameraPermissions.granted == true)
      
      const MediaPermissions = await MediaLibrary.requestPermissionsAsync()
      setHasMediaPermission(MediaPermissions.status == "granted")
    })();
  })

  if(hasCameraPermission === null || hasMediaPermission === null){
    return <View><Text> Waiting for permission...</Text></View>
  }
  if(hasCameraPermission === false || hasMediaPermission === false){
    return <View><Text>Permission denied...</Text></View>
  }
  if(picture){
    return <ImagePreview picture={picture} setPicture={setPicture}/>

  }  
  if(!isFocused){
    return null

  } else {

    return (
      <SafeAreaView style={styles.container}>
        <Camera style={styles.cameraContainer} type={type} flashMode={flash} ref={cameraRef}>
          <View style={styles.buttonsTopContainer}>

            <TouchableOpacity style={styles.generalButton}>
              <FontAwesome name="refresh" size={24} color="white" onPress={() => toggleCameraType()}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.generalButton}>
              <Entypo name="flash" size={24} color={flash === FlashMode.on ? "yellow" : "white"} onPress={() => toggleFlash()}/>
            </TouchableOpacity>

          </View>
          <View style={styles.buttonsBottomContainer}>
            <TouchableOpacity style={styles.cameraButton}>
              <Entypo name='camera' size={30} color='white' onPress={() => takePicture()} />
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center'
  },
  cameraContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  buttonsTopContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonsBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },

  generalButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 50,
    height: 50,
    marginRight: 5,
  },
  cameraButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginLeft: 20,
  }
});