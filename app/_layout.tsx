import SafeScreen from "@/components/common/SafeScreen";
import SplashScreen from "@/components/common/SplashScreen";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "./global.css";
import { AuthMiddleware } from "@/components/common/AuthMiddleware";
import { AuthProvider } from "@/context/AuthContext";

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      ExpoSplashScreen.hideAsync();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash && fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </AuthProvider>
  );
}
