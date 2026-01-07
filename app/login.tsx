import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useLogin } from '@/hooks/use-login';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginPage = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const {
        username,
        setUsername,
        password,
        setPassword,
        isError,
        errorText,
        handleLogin
    } = useLogin();

    const [isPassVisible, setIsPassVisible] = useState(false);

    const handleTogglePass = () => setIsPassVisible(prev => !prev);

    return (
        <KeyboardAvoidingView
            style={[styles.main, {backgroundColor: Colors[colorScheme ?? 'dark'].background}]}
            behavior='padding'
            keyboardVerticalOffset={20}
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
                            <ThemedText style={styles.inputLabel}>Username</ThemedText>
                            <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholderTextColor={'gray'}
                                    placeholder='mohammed_ali'
                                    autoCapitalize='none'
                                    style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                />
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={styles.inputContentContainer}>
                            <ThemedText style={styles.inputLabel}>Password</ThemedText>
                            <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder='********'
                                    secureTextEntry={!isPassVisible}
                                    placeholderTextColor={'gray'}
                                    style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                />
                                <Pressable onPress={handleTogglePass}>
                                    <Icon name={isPassVisible ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                                </Pressable>
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
                <ThemedView style={styles.bottomContainer}>
                    <Pressable onPress={() => router.push('/request-otp-reset-password')}>
                        <ThemedText style={styles.forgotPassText}>Forgot your password?</ThemedText>
                    </Pressable>
                    <Pressable onPress={handleLogin} style={[styles.loginButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                        <ThemedText style={[styles.loginButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Login</ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>
        </KeyboardAvoidingView>
    )
}

export default LoginPage

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
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 16
    },
    forgotPassText: {
        fontWeight: '600'
    },
    loginButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    loginButtonText: {
        fontWeight: '600'
    }
})