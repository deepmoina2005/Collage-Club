import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "@/data/Colors";
import Button from "@/components/Shared/Button";
import { useRouter } from "expo-router";

export default function landing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Image
        source={require("./../assets/images/login.png")}
        style={{
          width: "100%",
          height: 450,
        }}
      />
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcome to Collage Campus
        </Text>

        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          Your Collage news, Updated in your pocket, Join the club, Register for
          new event and many more
        </Text>

        <Button
          text="Get Started"
          onPress={() => router.push("/(auth)/SignUp")}
          loading={loading}
        />

        <Pressable onPress={()=>router.push("/(auth)/SignIn")}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              marginTop: 7,
            }}
          >
            Already have an account? Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
