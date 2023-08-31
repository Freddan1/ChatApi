import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function BottomSheet() {
  return (
    <View style={styles.bottomSheetContainer}/>
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
})