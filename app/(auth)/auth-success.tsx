import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";


export default function AuthSuccess() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const handleAnimationFinish = () => {
    setAnimationFinished(true);

    Animated.sequence([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(descOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/* Lottie Animation */}
      <LottieView
        source={require("../../assets/animation/success.json")}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        resizeMode={'contain'}
        style={{ width: 150, height: 150 }}
      />

      {/* Title */}
      {animationFinished && (
        <Animated.View
          style={{ opacity: titleOpacity }}
          className="w-full px-4"
        >
          <Text className="heading-lg text-center mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl">
            Success!
          </Text>
        </Animated.View>
      )}

      {/* Description */}
      {animationFinished && (
        <Animated.View style={{ opacity: descOpacity }} className="w-full px-4">
          <Text className="body-text text-center mt-1 sm:mt-2 md:mt-3 text-gray-600 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            Your operation was completed successfully.
          </Text>
        </Animated.View>
      )}

      {/* Done Button */}
      {animationFinished && (
        <Animated.View
          style={{ opacity: buttonOpacity }}
          className="w-full px-4 mt-4 sm:mt-5 md:mt-6"
        >
          <TouchableOpacity
            className="btn-primary py-2 px-4 sm:px-5 md:px-6 mx-auto"
            style={{ minWidth: Math.min(screenWidth * 0.4, 150) }}
            onPress={() => router.back()}
          >
            <Text className="text-white text-center text-sm sm:text-base font-medium">
              Done
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
