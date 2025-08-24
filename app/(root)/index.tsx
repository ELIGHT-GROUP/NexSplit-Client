// MainPage.js
import {View, Text, TextInput, TouchableOpacity, Image, FlatList} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {nex} from "@/mock/nex";
import useBreakpoint from "@/hooks/useBreakpoint";
import RenderCard from "@/app/(root)/RenderCard";

export default function MainPage() {
    const breakpoint = useBreakpoint()


    return (
        <View className="flex-1 bg-[f8f9fd]">

            {/*header panel*/}
            <view className="p-6 bg-light-green">
                {/* Header */}
                <View className="flex-row justify-between items-center mt-4">
                    <View>
                        <Text className="heading-md">Hello , Oshan</Text>
                        <Text className="heading-md">Have a Good Day</Text>
                    </View>
                    <View className="w-12 h-12 rounded-full bg-light-green items-center justify-center">
                        <Image
                            source={{uri: "https://cdn-icons-png.flaticon.com/512/219/219983.png"}}
                            className="w-10 h-10 rounded-full"
                        />
                    </View>
                </View>

                {/* Search */}
                <View className="flex-row items-center bg-light-gray rounded-xl mt-6 px-3 py-2">
                    <Ionicons name="search" size={20} color="#8B8B8B"/>
                    <TextInput
                        placeholder="Search Job"
                        className="flex-1 ml-2 body-text no-outline"
                        placeholderTextColor="#8B8B8B"
                    />
                    <View className="relative ml-2">
                        <Ionicons name="notifications-outline" size={24} color="#1C1C1C"/>
                        <View className="w-2 h-2 bg-orange-500 rounded-full absolute top-0 right-0"/>
                    </View>
                </View>

            </view>

            {/* Job List: scroll on mobile, grid on desktop */}
            <FlatList
                data={nex}
                key={breakpoint.width}
                keyExtractor={(item) => item.id.toString()}
                renderItem={RenderCard}
                showsVerticalScrollIndicator={false}
                numColumns={
                    breakpoint.xl ? 4 :
                        breakpoint.lg ? 3 :
                            breakpoint.md ? 2 : 1
                }
            />

            {/* Floating Action Button */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 bg-[#00AA5B] w-14 h-14 rounded-full items-center justify-center shadow-lg">
                <Ionicons name="add" size={28} color="white"/>
            </TouchableOpacity>

        </View>
    );
}
