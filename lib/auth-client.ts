import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient, inferAdditionalFields, twoFactorClient, usernameClient } from "better-auth/client/plugins";
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
        usernameClient(),
        emailOTPClient(),
        inferAdditionalFields({
            user: {
                hasProfile: {
                    type: "boolean",
                    defaultValue: false
                }
            }
        }),
        twoFactorClient()
    ]
});

export type Session = typeof authClient.$Infer.Session