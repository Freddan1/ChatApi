import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useContext, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function ImagePreview({picture, setPicture}) {
    const savePicture = async () => {
        try {
          const asset = await MediaLibrary.createAssetAsync(picture.uri)
          const album = await MediaLibrary.getAlbumAsync('Expo');
    
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Expo', asset, false)
          } else {
            await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false);
          }
    
          setPicture(null)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <SafeAreaView style={styles.container}>
        <Image source={{uri: picture.uri}} style={{flex: 1}}/>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.generalButton}>
            <AntDesign name="delete" size={30} color="white" onPress={() => setPicture(null)}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generalButton}>
            <Entypo name="check" size={30} color="white" onPress={() => savePicture()} />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center'
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
})    