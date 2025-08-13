import React, {useState} from "react";
import {View, TextInput} from "react-native";
import {Feather} from "@expo/vector-icons";

interface FormInputProps {
    icon: keyof typeof Feather.glyphMap;
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "phone-pad";
}

export default function FormInput({
                                      icon,
                                      placeholder,
                                      secureTextEntry = false,
                                      keyboardType = "default",
                                  }: FormInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View
            className={`flex-row items-center mb-6 pb-2 ${
                isFocused ? "border-b-2 border-[#00AA5B]" : ""
            }`}
        >
            <Feather name={icon} size={18} color={isFocused ? "#00AA5B" : "#8B8B8B"}/>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#8B8B8B"
                secureTextEntry={secureTextEntry && !passwordVisible}
                keyboardType={keyboardType}
                className="flex-1 ml-3 body-text no-outline"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {secureTextEntry && (
                <Feather
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    name="eye"
                    size={18}
                    color={isFocused ? "#00AA5B" : "#8B8B8B"}
                />
            )}
        </View>
    );
}
