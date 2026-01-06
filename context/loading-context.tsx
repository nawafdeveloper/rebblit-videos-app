import React, { createContext, ReactNode, useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme, View } from "react-native";

type LoadingContextType = {
    loading: boolean;
    setLoading: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();

    const backgroundColor =
        colorScheme === "dark"
            ? "rgba(255,255,255,0.4)"
            : "rgba(0,0,0,0.4)";

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}

            {loading && (
                <View style={[StyleSheet.absoluteFill, styles.overlay, { backgroundColor }]}>
                    <ActivityIndicator size="small" />
                </View>
            )}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}

const styles = StyleSheet.create({
    overlay: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
});
