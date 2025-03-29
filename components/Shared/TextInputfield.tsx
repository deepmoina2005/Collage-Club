import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/data/Colors";

type TextInputfieldProps = {
  label: string;
  onChangeText: (text: string) => void;
  password?: boolean;
};

export default function TextInputfield({
  label,
  onChangeText,
  password = false,
}: TextInputfieldProps) {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text style={{ color: Colors.GRAY }}>{label}</Text>
      <TextInput
        placeholder={label}
        style={styles.textInput}
        secureTextEntry={password}
        onChangeText={onChangeText} // Ensure this is passed as a prop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 0.3,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 17,
  },
});
