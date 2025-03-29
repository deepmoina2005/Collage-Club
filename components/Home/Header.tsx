import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/data/Colors'
import { AuthContext } from '@/context/AuthContext'

export default function Header() {
    const {user} = useContext(AuthContext)
  return (
    <View style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
      <View>
        <Text style={{
            fontSize: 25,
            color: Colors.PRIMARY,
            fontWeight: 'bold'
        }}>Hey There!</Text>
        <Text style={{
            fontSize: 20,
            color: Colors.GRAY
        }}>Sibsagar Commerce Collage</Text>
      </View>
      <Image source={{uri:user.image}} style={{
        width: 45,
        height: 45,
        borderRadius: 99
      }}/>
    </View>
  )
}