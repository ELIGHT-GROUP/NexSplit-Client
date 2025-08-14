import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { Image } from "expo-image";

export default function SplashScreen() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image
          source={require("../../assets/images/favicon.png")}
          style={{ width: 60, height: 60 }}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}