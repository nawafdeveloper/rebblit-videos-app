import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTwoFactor } from '@/hooks/use-two-factor';
import { router } from 'expo-router';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TwoFactorOtpPage = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const {
        otp,
        isError,
        errorText,
        setOtp,
        handleVerifyOtp
    } = useTwoFactor();

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={[styles.main, { backgroundColor: Colors[colorScheme ?? 'dark'].background }]}
            behavior='padding'
            keyboardVerticalOffset={20}
        >
            <TouchableWithoutFeedback
                onPress={handleDismissKeyboard}
                style={{ flex: 1 }}
            >
                <ThemedView style={[styles.main, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                    <ThemedView style={styles.header}>
                        <Pressable onPress={() => router.back()}>
                            <Icon name="arrow-left-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        </Pressable>
                    </ThemedView>
                    <ThemedView style={styles.content}>
                        <ThemedView style={styles.fieldsContainer}>
                            <ThemedView style={styles.inputContentContainer}>
                                <ThemedText style={styles.inputLabel}>Enter the code we send you</ThemedText>
                                <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                                    <TextInput
                                        value={otp}
                                        onChangeText={setOtp}
                                        placeholderTextColor={'gray'}
                                        placeholder='******'
                                        focusable={false}
                                        keyboardType='numeric'
                                        maxLength={6}
                                        style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                    />
                                </ThemedView>
                            </ThemedView>
                            {isError && (
                                <ThemedView style={styles.errorContainer}>
                                    <Icon name="information-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                                    <ThemedText style={styles.errorText}>{errorText}</ThemedText>
                                </ThemedView>
                            )}
                        </ThemedView>
                    </ThemedView>
                    <Pressable onPress={handleVerifyOtp} style={[styles.sendButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                        <ThemedText style={[styles.sendButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Verify Code</ThemedText>
                    </Pressable>
                </ThemedView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default TwoFactorOtpPage

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    fieldsContainer: {
        flexDirection: 'column',
        gap: 24
    },
    inputContentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: Platform.OS === 'android' ? 8 : 18,
        borderBottomWidth: 1
    },
    input: {
        flex: 1
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
    sendButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    sendButtonText: {
        fontWeight: '600'
    }
})