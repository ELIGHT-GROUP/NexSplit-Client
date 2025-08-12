import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Page</Text>
      <Text style={styles.subtitle}>Blank page for testing routing</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/verify-code")}
      >
        <Text style={styles.buttonText}>Go to Verify Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text style={styles.buttonText}>Go to Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(root)")}
      >
        <Text style={styles.buttonText}>Go to Root (Main App)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
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
    backgroundColor: "#007AFF",
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
