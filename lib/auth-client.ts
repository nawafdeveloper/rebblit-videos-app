import { expoClient } from "@better-auth/expo/client";
import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    plugins: [
        expoClient({
            scheme: "rebblitapp",
            storagePrefix: "rebblitapp",
            storage: SecureStore,
        }),
        usernameClient()
    ]
});