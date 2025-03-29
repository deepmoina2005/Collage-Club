import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/Shared/Button";
import { useRouter } from "expo-router";
import axios from "axios";
import EventCard from "@/components/Events/EventCard";
import Colors from "@/data/Colors";
import { AuthContext } from "@/context/AuthContext";

export default function Event() {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const [eventList, setEventList] = useState();
  const { user } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    selectedTab === 0 ? GetAllEvents() : GetUserEvents();
  }, [selectedTab]); // ✅ Refetch on tab change
  const GetAllEvents = async () => {
    setloading(true);
    const result = await axios.get(
      process.env.EXPO_PUBLIC_HOST_URL + "/events"
    );
    console.log(result.data);
    setEventList(result.data);
    setloading(false);
  };

  const GetUserEvents = async () => {
    setloading(true);
    const result = await axios.get(
      process.env.EXPO_PUBLIC_HOST_URL + "/event-register?email=" + user?.email
    );
    console.log(result.data);
    setEventList(result.data);
    setloading(false);
  };
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Event
        </Text>
        <Button text=" + " onPress={() => router.push("/add-event")} />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 20,
          padding: 10,
        }}
      >
        <Pressable onPress={() => setSelectedTab(0)}>
          <Text
            style={[
              styles.tabtext,
              {
                backgroundColor:
                  selectedTab == 0 ? Colors.PRIMARY : Colors.WHITE,
                color: selectedTab == 0 ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable onPress={() => setSelectedTab(1)}>
          <Text
            style={[
              styles.tabtext,
              {
                backgroundColor:
                  selectedTab == 1 ? Colors.PRIMARY : Colors.WHITE,
                color: selectedTab == 1 ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            Registered
          </Text>
        </Pressable>
      </View>

      {/* Display Event List */}
      <FlatList
        data={eventList}
        onRefresh={GetAllEvents}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <EventCard
            {...item}
            key={index}
            isRegistered={selectedTab == 1 ? true : false}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabtext: {
    padding: 4,
    fontSize: 20,
    paddingHorizontal: 15,
    borderRadius: 99,
  },
});
