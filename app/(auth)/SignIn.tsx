import { View, Text, Image, Pressable, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import TextInputfield from "@/components/Shared/TextInputfield";
import Button from "@/components/Shared/Button";
import Colors from "@/data/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const onSignInButtonClick = async () => {
    if (!email || !password) {
      ToastAndroid.show("Enter Email & Password", ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        console.log(response.user.email);
        // API CALL TO FETCH USER DATA
        const result = await axios.get(
          process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + response.user.email
        );
        console.log(result.data);
        setUser(result?.data);
        // SAVE TO CONTEXT TO SHARE ACROSS APPLICATION
      }
      router.push('/');
    } catch (error) {
      ToastAndroid.show("Incorrect email & password", ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("./../../assets/images/logo.png")}
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Sign In To College Campus
        </Text>
      </View>

      <TextInputfield label="College Email" onChangeText={setEmail} />
      <TextInputfield label="Password" password={true} onChangeText={setPassword} />

      <Button text="Sign In" onPress={onSignInButtonClick} loading={loading} />

      <Pressable onPress={() => router.push("/(auth)/SignUp")}>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: 7,
          }}
        >
          New to College Campus App? Create a new account here.
        </Text>
      </Pressable>
    </View>
  );
}