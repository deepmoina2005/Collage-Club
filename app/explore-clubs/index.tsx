import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "@/components/Clubs/ClubCard";
import Button from "@/components/Shared/Button";
import Colors from "@/data/Colors";
import { AuthContext } from "@/context/AuthContext";

export type CLUB = {
  id: number;
  name: string;
  club_logo: string;
  about: string;
  createdon: string;
  isFollowed: boolean;
};

export default function ExploreClubs() {
  const [loading, setLoading] = useState(false);
  const [clubList, setClubList] = useState<CLUB[]>([]);
  const { user } = useContext(AuthContext);
  const [followedClub, setFollowedClub] = useState<any[]>([]); // Ensure it's an array

  useEffect(() => {
    GetAllClubs();
  }, []);

  const GetAllClubs = async () => {
    setLoading(true);
    try {
      const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + "/clubs");
      console.log(result.data);
      setClubList(result.data);
      GetUserFollowedClubs();
    } catch (error) {
      console.error("Error fetching clubs:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetUserFollowedClubs = async () => {
    try {
      const result = await axios.get(
        process.env.EXPO_PUBLIC_HOST_URL + "/clubfollower?u_email=" + user.email
      );
      console.log(result?.data);
      setFollowedClub(result?.data || []);
    } catch (error) {
      console.error("Error fetching followed clubs:", error);
    }
  };

  const onAddClubButtonClick = () => {
    // Add club logic here
  };

  const isFollowed = (clubId: number) => {
    return followedClub?.some((item: any) => item.club_id === clubId);
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 7,
          margin: 7,
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "dashed",
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: Colors.GRAY,
          }}
        >
          Create New Teams / Clubs
        </Text>
        <Button text="+ Add" onPress={onAddClubButtonClick} loading={loading} />
      </View>
      <FlatList
        data={clubList}
        keyExtractor={(item) => item.id.toString()} // Ensures unique keys
        numColumns={2}
        renderItem={({ item }) => (
          <ClubCard {...item} isFollowed={isFollowed(item.id)} refreshData={GetAllClubs} />
        )}
      />
    </View>
  );
}
