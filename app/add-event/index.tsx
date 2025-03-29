import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/data/Colors";
import * as ImagePicker from "expo-image-picker";
import TextInputfield from "@/components/Shared/TextInputfield";
import { AuthContext } from "@/context/AuthContext";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/components/Shared/Button";
import moment from "moment";
import axios from "axios";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/config/CloudinaryConfig";
import { useRouter } from "expo-router";

export default function AddEvent() {
  const [eventName, setEventName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [link, setLink] = useState<string>();
  const [image, setImage] = useState<string | undefined>();
  const { user } = useContext(AuthContext);
  const [time, setTime] = useState("Select Time");
  const [date, setDate] = useState("Select Date");
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const router =useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onTimeChange = (event: any, selectedTime: any) => {
    setOpenTimePicker(false);
    console.log(selectedTime);
    setSelectedTime(selectedTime);
    setTime(moment(selectedTime).format("hh:mm a"));
  };
  const onDateChange = (event: any, selectedDate: any) => {
    setOpenDatePicker(false);
    console.log(selectedDate);
    setSelectedDate(selectedDate);
    setDate(moment(selectedDate).format("MMMM Do YYYYY"));
  };

  const onSubmitButtonClick = () => {

    if (!eventName || !image || !location || !date || !time) {
      Alert.alert('Please enter all details !')
      return;
    }
    upload(cld, {
      file: image,
      options: options,
      callback: async (error, resp) => {
        if (resp) {
          const result = await axios.post(
            process.env.EXPO_PUBLIC_HOST_URL + "/events",
            {
              eventName: eventName,
              bannerUrl: resp.url,
              location: location,
              link: link,
              eventDate: selectedDate,
              eventTime: selectedTime,
              email: user?.email,
            }
          );
          console.log(result);
          Alert.alert('Great!','New Event added',[
            {
              text:'Ok',
              onPress:()=>router.replace('/Event')
            }
          ])
          
        }
      },
    });
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Add Event
      </Text>

      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("./../../assets/images/image.png")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>

      <TextInputfield
        label="Event Name"
        onChangeText={(v) => setEventName(v)}
      />
      <TextInputfield label="Location" onChangeText={(v) => setLocation(v)} />
      <TextInputfield
        label="Link For Event Details"
        onChangeText={(v) => setLink(v)}
      />
      <View>
        <Button
          text={date}
          outline={true}
          onPress={() => setOpenDatePicker(!openDatePicker)}
        />
        <Button
          text={time}
          outline={true}
          onPress={() => setOpenTimePicker(!openTimePicker)}
        />
      </View>
      {openTimePicker && (
        <RNDateTimePicker
          mode="time"
          value={new Date()}
          onChange={onTimeChange}
        />
      )}
      {openDatePicker && (
        <RNDateTimePicker
          mode="date"
          value={new Date()}
          onChange={onDateChange}
        />
      )}

      <Button text="Submit" onPress={() => onSubmitButtonClick()} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    height: 140,
    marginTop: 10,
    borderRadius: 15,
    textAlignVertical: "top",
    elevation: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 15,
  },
});
