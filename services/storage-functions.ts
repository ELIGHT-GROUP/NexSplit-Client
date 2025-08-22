// storage.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function getAuthToken() {
  return Platform.OS === "web"
    ? Promise.resolve(localStorage.getItem("authToken"))
    : SecureStore.getItemAsync("authToken");
}

export async function removeAuthToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("authToken");
    return Promise.resolve();
  }
  return SecureStore.deleteItemAsync("authToken");
}
