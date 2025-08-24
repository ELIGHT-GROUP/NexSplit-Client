import React, { useState, useRef } from "react";
import {
    Modal,
    View,
    TouchableOpacity,
    Pressable,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PopupDialogProps {
    trigger: React.ReactNode;
    header?: React.ReactNode;
    children?: React.ReactNode | ((close: () => void) => React.ReactNode);
    footer?: React.ReactNode | ((close: () => void) => React.ReactNode);
}

const PopupDialog: React.FC<PopupDialogProps> = ({
                                                     trigger,
                                                     header,
                                                     children,
                                                     footer,
                                                 }) => {
    const [visible, setVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const runOpenAnimation = () => {
        scaleAnim.setValue(0.95);
        opacityAnim.setValue(0);

        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 150,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const runCloseAnimation = (onFinish: () => void) => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 100,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(({ finished }) => {
            if (finished) onFinish();
        });
    };

    const openDialog = () => {
        setVisible(true);
        setTimeout(runOpenAnimation, 50);
    };

    const closeDialog = () => {
        runCloseAnimation(() => setVisible(false));
    };

    return (
        <>
            <Pressable onPress={openDialog}>{trigger}</Pressable>

            <Modal transparent visible={visible} animationType="none" onRequestClose={closeDialog}>
                <View className="flex-1 justify-center items-center">
                    {/* Overlay */}
                    <Animated.View
                        style={[
                            StyleSheet.absoluteFillObject,
                            { backgroundColor: "rgba(0,0,0,0.4)", opacity: opacityAnim },
                        ]}
                    />

                    {/* Card */}
                    <Animated.View
                        style={{
                            width: "95%",
                            maxWidth: 500,
                            backgroundColor: "#fff",
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                            borderRadius: 8,
                            overflow: "hidden"
                        }}
                    >
                        {/* Header */}
                        {(header || true) && (
                            <View className="flex-row justify-between items-center px-5 py-4 bg-light">
                                <View>{header}</View>
                                <TouchableOpacity onPress={closeDialog}>
                                    <Ionicons name="close" size={22} color="#1C1C1C" />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Body */}
                        <View className="px-5 py-4 bg-light">{typeof children === "function" ? children(closeDialog) : children}</View>

                        {/* Footer */}
                        {footer && (
                            <View className="px-5 py-3 bg-light flex-row justify-end space-x-3">
                                {typeof footer === "function" ? footer(closeDialog) : footer}
                            </View>
                        )}
                    </Animated.View>
                </View>
            </Modal>
        </>
    );
};

export default PopupDialog;
