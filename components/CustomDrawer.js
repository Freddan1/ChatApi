import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { AuthContext } from './AuthContext'

export default function CustomDrawer(props) {
    const {handleLogout} = useContext(AuthContext)
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.flexSpace}/>
      <DrawerItem labelStyle={styles.label} label="Logout" onPress={() => handleLogout()} />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({

    flexSpace: {
        flex: 1,

    },

    label: { 
      color: "black",  
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: 200,
      height: 40,
      margin: 10,
      borderWidth: 1,
      padding: 10,
    },
})    