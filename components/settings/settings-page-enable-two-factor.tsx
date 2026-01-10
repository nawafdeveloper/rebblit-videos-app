import { Colors } from '@/constants/theme';
import { useTwoFactor } from '@/hooks/use-two-factor';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageEnableTwoFactorSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { data: session, isPending } = authClient.useSession();
    const {
        password,
        isError,
        errorText,
        setPassword,
        handleDisableTwoFactor,
        handleEnableTwoFactor
    } = useTwoFactor();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleTogglePass = () => setPasswordVisible(prev => !prev);

    if (isPending) {
        return <GlobalLoading />
    }

    if (!session) {
        return null;
    }

    const handleToggleTwoFactor = () => {
        if (session.user.twoFactorEnabled) {
            handleDisableTwoFactor();
        } else {
            handleEnableTwoFactor();
        }
    };

    return (
        <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
            <ThemedText style={styles.description}>
                For your security, please confirm your password before enabling two-factor authentication.
            </ThemedText>
            <ThemedView style={styles.contentContainer}>
                <ThemedText style={styles.label}>Current password</ThemedText>
                <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='********'
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor={'gray'}
                        style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                    />
                    <Pressable onPress={handleTogglePass}>
                        <Icon name={passwordVisible ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                    </Pressable>
                </ThemedView>
            </ThemedView>
            {isError && (
                <ThemedView style={styles.errorContainer}>
                    <Icon name="information-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                    <ThemedText style={styles.errorText}>{errorText}</ThemedText>
                </ThemedView>
            )}
            <Pressable onPress={handleToggleTwoFactor} style={[styles.applyButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                <ThemedText style={[styles.applyButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Apply changes</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default SettingsPageEnableTwoFactorSection

const styles = StyleSheet.create({
    main: {
        flex: 1,
        gap: 16
    },
    description: {
        fontSize: 12,
        color: 'gray',
        minWidth: 0,
        lineHeight: 14,
        paddingHorizontal: 16
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 6,
        paddingTop: 24,
        paddingHorizontal: 16
    },
    label: {
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: Platform.OS === 'android' ? 8 : 18,
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,
        color: 'gray',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    errorText: {
        fontSize: 14,
        fontWeight: '600'
    },
    applyButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16
    },
    applyButtonText: {
        fontWeight: '600'
    }
})