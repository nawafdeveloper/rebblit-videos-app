import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSignup } from '@/hooks/use-signup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignupPage = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const {
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        username,
        setUsername,
        isError,
        errorText,
        handleSignup
    } = useSignup();

    const [isPassVisible, setIsPassVisible] = useState(false);

    const handleTogglePass = () => setIsPassVisible(prev => !prev);

    return (
        <KeyboardAvoidingView
            style={styles.main}
        >
            <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
                <ThemedView style={styles.header}>
                    <Pressable onPress={() => router.back()}>
                        <Icon name="arrow-left-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                    </Pressable>
                </ThemedView>
                <ThemedView style={styles.content}>
                    <ThemedView style={styles.fieldsContainer}>
                        <ThemedView style={styles.inputContentContainer}>
                            <ThemedText style={styles.inputLabel}>Email address</ThemedText>
                            <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholderTextColor={'gray'}
                                    placeholder='yourname@mail.com'
                                    autoCapitalize='none'
                                    style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                />
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={styles.inputContentContainer}>
                            <ThemedText style={styles.inputLabel}>Password</ThemedText>
                            <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
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
                        <ThemedView style={styles.inputContentContainer}>
                            <ThemedText style={styles.inputLabel}>Display name</ThemedText>
                            <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder='Mohammed Ali'
                                    placeholderTextColor={'gray'}
                                    style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                />
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={styles.inputContentContainer}>
                            <ThemedText style={styles.inputLabel}>Username</ThemedText>
                            <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder='@mohammed_ali'
                                    autoCapitalize='none'
                                    placeholderTextColor={'gray'}
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
                    <Pressable onPress={handleSignup} style={[styles.signupButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                        <ThemedText style={[styles.signupButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Create account</ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>
        </KeyboardAvoidingView>
    )
}

export default SignupPage

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
        paddingHorizontal: 16,
        paddingBottom: 70
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
        color: 'gray'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 18,
        paddingVertical: Platform.OS === 'android' ? 2 : 8,
        borderRadius: 99,
        borderCurve: 'continuous',
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
    signupButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    signupButtonText: {
        fontWeight: '600'
    }
})