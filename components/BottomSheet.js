import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function BottomSheet() {
  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.container}>
      <AntDesign name="delete" size={24} color="black" />
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