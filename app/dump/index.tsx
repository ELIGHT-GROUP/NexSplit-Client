import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import PopupDialog from "@/components/ui/PopupDialog";

export default function DumpPage() {
    const router = useRouter();
    return (
        <View>
            <Text>DumpPage</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
                <Text>Login</Text>
            </TouchableOpacity>

            <PopupDialog
                trigger={<Text className="text-blue-500">Open Dialog</Text>}
                header={<Text className="heading-md">Dialog Title</Text>}
                footer={
                    <View className="flex-row justify-end space-x-3">
                        <TouchableOpacity className="btn-orange px-4 py-2 rounded-lg">
                            <Text className="text-white">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="btn-primary px-4 py-2 rounded-lg">
                            <Text className="text-white">Confirm</Text>
                        </TouchableOpacity>
                    </View>
                }
            >
                <Text className="body-text">This is the dialog body.</Text>
            </PopupDialog>



        </View>
    );
}
