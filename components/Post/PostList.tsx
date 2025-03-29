import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PostCard from './PostCard'

export default function PostList({posts, Onrefresh, loading}:any) {
  return (
    <View>
      <FlatList
      data={posts}
      onRefresh={Onrefresh}
      refreshing={loading}
      renderItem={({item,index})=>(
        <PostCard post={item}/>
      )}
      />
    </View>
  )
}