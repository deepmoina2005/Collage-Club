import { View, Text } from "react-native";
import React, { useState } from "react";
import EmptyState from "@/components/Clubs/EmptyState";

export default function Clubs() {
  const [followedClubs, setFollowedClubs] = useState([]);
  return (
    <View>
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
          }}
        >
          Clubs
        </Text>
        {followedClubs?.length == 0 && <EmptyState />}
      </View>
    </View>
  );
}