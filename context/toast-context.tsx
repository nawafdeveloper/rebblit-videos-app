import { Colors } from "@/constants/theme";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, useColorScheme } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Icon, { IconName } from "react-native-remix-icon";

type ToastType = "success" | "error" | "info" | "warning";

type ToastContextType = {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const { height } = Dimensions.get("window");

export function ToastProvider({ children }: { children: ReactNode }) {
    const colorScheme = useColorScheme();
    const [message, setMessage] = useState("");
    const [type, setType] = useState<ToastType>("info");

    const translateY = useSharedValue(height);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const showToast = (
        msg: string,
        toastType: ToastType = "info",
        duration = 2500
    ) => {
        setMessage(msg);
        setType(toastType);

        translateY.value = withTiming(
            height - 140,
            { duration: 300, easing: Easing.out(Easing.cubic) }
        );

        setTimeout(() => {
            translateY.value = withTiming(
                height,
                { duration: 300, easing: Easing.in(Easing.cubic) }
            );
        }, duration);
    };

    const iconName: Record<ToastType, IconName> = {
        success: "check-line",
        error: "close-circle-line",
        info: "information-line",
        warning: "alert-line",
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <Animated.View
                pointerEvents="none"
                style={[
                    styles.toast,
                    animatedStyle,
                    {
                        backgroundColor:
                            Colors[colorScheme ?? "dark"].card,
                    },
                ]}
            >
                <Icon name={iconName[type]} size={20} color={Colors[colorScheme ?? "dark"].text} />
                <Text
                    style={[
                        styles.text,
                        { color: Colors[colorScheme ?? "dark"].text },
                    ]}
                >
                    {message}
                </Text>
            </Animated.View>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}

const styles = StyleSheet.create({
    toast: {
        position: "absolute",
        left: 16,
        right: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    text: {
        fontSize: 14,
        flex: 1,
    },
});
