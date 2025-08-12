import { Slot } from "expo-router";
import SafeScreen from "@/components/common/SafeScreen";
import "./global.css";
import {useFonts} from "expo-font";

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
        "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    });

    if (!fontsLoaded) {
        return null; // Could show a splash/loading screen here
    }

  return (
    <SafeScreen>
      <Slot  />
    </SafeScreen>
  );
}
