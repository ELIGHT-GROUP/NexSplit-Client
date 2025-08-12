import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

interface SplashScreenProps {
  appName?: string;
  logoSource?: any;
  backgroundColor?: string;
  textColor?: string;
  showLoadingText?: boolean;
}

export default function SplashScreen({
  appName = "NexSplit",
  logoSource,
  backgroundColor = "#ffffff",
  textColor = "#333333",
  showLoadingText = true,
}: SplashScreenProps) {
  return (
    <View
      className="flex-1 justify-center items-center w-full h-full"
      style={{ backgroundColor }}
    >
      {/* Logo Section */}
      <View className="mb-10">
        {logoSource ? (
          <Image
            source={logoSource}
            className="w-30 h-30"
            contentFit="contain"
          />
        ) : (
          <View className="w-30 h-30 rounded-full bg-gray-100 justify-center items-center border-2 border-gray-200">
            <Text
              className="text-2xl font-bold"
              style={{ color: textColor }}
            >
              NS
            </Text>
          </View>
        )}
      </View>

      {/* App Name */}
      <View className="mb-16">
        <Text
          className="text-2xl font-semibold tracking-wide"
          style={{ color: textColor }}
        >
          {appName}
        </Text>
      </View>

      {/* Loading Text */}
      {showLoadingText && (
        <View className="absolute bottom-24">
          <Text
            className="text-base opacity-70"
            style={{ color: textColor }}
          >
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
}
