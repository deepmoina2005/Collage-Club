import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/data/Colors";
import TextInputfield from "@/components/Shared/TextInputfield";
import Button from "@/components/Shared/Button";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { upload } from 'cloudinary-react-native'
import { cld, options } from "@/config/CloudinaryConfig";
import axios from 'axios'
import { router, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function SignUp() {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const router = useRouter();

  const onButtonPress = () => {
    if (!email?.length || !password?.length || !fullName?.length || !profileImage?.length) { // ✅ Fixed validation
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      return;
    }
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential);
        // Upload Profile Image
        await upload(cld,{
          file:profileImage,
          options:options,
          callback:async(error:any,response:any)=>{
            if (error){
              console.log(error)
            }
            if (response){
              console.log(response?.url)
              const result = await axios.post(process.env.EXPO_PUBLIC_HOST_URL+"/user",{
                name:fullName,
                email:email,
                image:response?.url??''
              });
              console.log(result);
              // Route to Home Screen
              setUser({
                name:fullName,
                email:email,
                image:response?.url
              })
              router.push('/');
            }
          }
        })
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Fixed mediaTypes
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ paddingTop: 40, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Create New Account</Text>

      <View style={{ display: "flex", alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require("./../../assets/images/profile.png")} style={styles.profileImage} />
          )}
          <Ionicons
            name="camera"
            size={24}
            color={Colors.PRIMARY}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          />
        </TouchableOpacity>
      </View>

      <TextInputfield label="Full Name" onChangeText={setFullName} />
      <TextInputfield label="College Email" onChangeText={setEmail} />
      <TextInputfield label="Password" password={true} onChangeText={setPassword} />

      <Button text="Create Account" onPress={onButtonPress} loading={loading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 99,
    marginTop: 20,
  },
});