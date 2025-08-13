import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function MainPage() {
  const router = useRouter();
  return (
    <View>
      <Text>MainPage</Text>
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
