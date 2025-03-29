import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/data/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../Shared/Button";

type EVENT = {
  id: number;
  eventname: string;
  bannerurl: string;
  location: string;
  link: string;
  eventdate: string;
  eventtime: string;
  createdby: string;
  username: string;
};
export default function EventCard(event: EVENT) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor:Colors.WHITE,
        marginBottom:10,
        borderRadius:15,
        margin:7
      }}
    >
      <Image
        source={{ uri: event.bannerurl }}
        style={{
          height: 260,
          objectFit: "contain",
          borderRadius: 15,
          backgroundColor: "black",
        }}
      />
      <Text
        style={{
          fontSize: 23,
          fontWeight: "bold",
          marginTop: 7,
        }}
      >
        {event.eventname}
      </Text>
      <Text
        style={{
          color: Colors.GRAY,
          fontSize: 16,
        }}
      >
        Event by {event.username}
      </Text>
      <View style={styles.subContainer}>
        <Ionicons name="location-outline" size={24} color={Colors.GRAY} />
        <Text
          style={{
            color: Colors.GRAY,
            fontSize: 16,
          }}
        >
          {event.location}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Ionicons name="calendar-outline" size={24} color={Colors.GRAY} />
        <Text
          style={{
            color: Colors.GRAY,
            fontSize: 16,
          }}
        >
          {event.eventdate} at {event.eventtime}
        </Text>
      </View>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:10
      }}>
        <Button text="Share" outline={true} fullwidth={true} onPress={() => console.log()} />
        <Button text="Register" fullwidth={true} onPress={() => console.log()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },
});
