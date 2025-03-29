import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/data/Colors";

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  outline?: boolean;
  fullwidth?: boolean;
};

export default function Button({
  text,
  onPress,
  loading = false,
  outline = false,
  fullwidth = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: outline ? Colors.WHITE : Colors.PRIMARY,
        borderWidth: outline ? 1 : 0,
        borderColor: Colors.PRIMARY,
        marginTop: 15,
        borderRadius: 10,
        flex: fullwidth ? 1 : 0,
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: outline ? Colors.PRIMARY : Colors.WHITE,
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
