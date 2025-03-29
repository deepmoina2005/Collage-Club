import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import { useRouter } from 'expo-router'

const CategoryOptions=[
    {
        name: 'Events',
        banner: require('./../../assets/images/event.png'),
        path: '(tabs)/Event'
    },
    {
        name: 'Latest Post',
        banner: require('./../../assets/images/news.png'),
        path: '(tabs)/Home'
    },
    {
        name: 'Clubs',
        banner: require('./../../assets/images/clubs.png'),
        path: '(tabs)/Clubs'
    },
    {
        name: 'New Post',
        banner: require('./../../assets/images/add-post.png'),
        path: 'add-post'
    }
]

export default function Category() {
    const router=useRouter();
  return (
    <View style={{
        marginTop: 15
    }}>
      <FlatList
      data={CategoryOptions}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity
        //@ts-ignore
        onPress={()=>router.push(item.path)}
        style={styles.cardContainer}>
            <Image source={item.banner} style={styles.bannerImage}/>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
  )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
        margin:3
    },
    bannerImage:{
        height: 80,
        objectFit: 'cover',
        width: Dimensions.get('screen').width*0.43,
        borderRadius: 10
    },
    text:{
        position: 'absolute',
        padding: 10,
        fontSize: 17,
        color: Colors.WHITE,
        fontWeight: '400'
    }
})