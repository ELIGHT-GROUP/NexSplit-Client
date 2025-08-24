import {View, Text, Image} from "react-native";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";


const RenderCard = ({item}: any) => (
    <View className="bg-[#2a9261] rounded-lg overflow-hidden relative flex-1 m-2">


        {/* Bottom layer - Image */}
        <Image
            source={{uri: item.image}}
            className="absolute right-0 top-0 h-full w-full"
            resizeMode="cover"
        />

        {/* Top layer - Gradient + Text */}
        <LinearGradient
            colors={['#2a9261','#2a9261', 'transparent']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-full p-4"
        >
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    {/*<Image source={{uri: item.image}} className="w-8 h-8 rounded-full"/>*/}
                    <Text className="text-white font-semibold ml-2">{item.date}</Text>
                </View>
                <Text className="text-white bg-[#008F4B] px-3 py-1 rounded-lg text-xs">
                    +{item.members} members
                </Text>
            </View>

            <Text className="text-white text-lg font-semibold mt-2">{item.title}</Text>
            <Text className="text-white text-sm mt-1">{item.description}</Text>

            <View className="flex-row flex-wrap gap-2 mt-4">
                {item.tags.map((tag: string, index: number) => (
                    <Text
                        key={index}
                        className="bg-white/20 text-white text-xs px-3 py-1 rounded-sm"
                    >
                        {tag}
                    </Text>
                ))}
            </View>
        </LinearGradient>
    </View>
);

export default RenderCard;