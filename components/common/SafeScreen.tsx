import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {useBgColor} from "@/stores/BgColorStatus";

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const {bgColor} = useBgColor();

  return (
    <View className={`${bgColor} flex-1`} style={{ paddingTop: insets.top }}>
      {children}
    </View>
  );
};
export default SafeScreen;
