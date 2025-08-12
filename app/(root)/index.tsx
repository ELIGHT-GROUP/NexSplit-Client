import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import "../global.css";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-start items-center p-4">
      <Text style={styles.title}>Root Index Page</Text>
      <Text style={styles.subtitle}>Main app page for testing routing</Text>

      <TouchableOpacity
        className="bg-primary text-white"
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text style={styles.buttonText}>Go to Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/sign-up")}
      >
        <Text style={styles.buttonText}>Go to Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        <Text style={styles.buttonText}>Go to Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
