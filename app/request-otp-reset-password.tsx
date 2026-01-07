import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useForgotPassword } from '@/hooks/use-forgot-password';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RequestOtpResetPassword = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const {
        authMethod,
        email,
        setEmail,
        otp,
        setOtp,
        isError,
        errorText,
        handleRequestOtp,
        handleVerifyPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        handleResetPassword
    } = useForgotPassword();

    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmationNewPasswordVisible, setIsConfirmationNewPasswordVisible] = useState(false);

    const handleToggleNewPassVisiblility = () => setIsNewPasswordVisible(prev => !prev);
    const handleToggleConfirmationNewPassVisiblility = () => setIsConfirmationNewPasswordVisible(prev => !prev);

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
                            {authMethod === 'send-otp' ? (
                                <>
                                    <ThemedView style={styles.inputContentContainer}>
                                        <ThemedText style={styles.inputLabel}>Enter your email address</ThemedText>
                                        <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
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
                                    {isError && (
                                        <ThemedView style={styles.errorContainer}>
                                            <Icon name="information-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                                            <ThemedText style={styles.errorText}>{errorText}</ThemedText>
                                        </ThemedView>
                                    )}
                                </>
                            ) : authMethod === 'verify-otp' ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <ThemedView style={styles.inputContentContainer}>
                                        <ThemedText style={styles.inputLabel}>New password</ThemedText>
                                        <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                                            <TextInput
                                                value={newPassword}
                                                onChangeText={setNewPassword}
                                                placeholder='********'
                                                focusable={false}
                                                secureTextEntry={!isNewPasswordVisible}
                                                placeholderTextColor={'gray'}
                                                style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                            />
                                            <Pressable onPress={handleToggleNewPassVisiblility}>
                                                <Icon name={isNewPasswordVisible ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                                            </Pressable>
                                        </ThemedView>
                                    </ThemedView>
                                    <ThemedView style={styles.inputContentContainer}>
                                        <ThemedText style={styles.inputLabel}>Confirm new password</ThemedText>
                                        <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                                            <TextInput
                                                value={confirmNewPassword}
                                                onChangeText={setConfirmNewPassword}
                                                placeholder='********'
                                                focusable={false}
                                                secureTextEntry={!isConfirmationNewPasswordVisible}
                                                placeholderTextColor={'gray'}
                                                style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                                            />
                                            <Pressable onPress={handleToggleConfirmationNewPassVisiblility}>
                                                <Icon name={isConfirmationNewPasswordVisible ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                                            </Pressable>
                                        </ThemedView>
                                    </ThemedView>
                                    {isError && (
                                        <ThemedView style={styles.errorContainer}>
                                            <Icon name="information-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                                            <ThemedText style={styles.errorText}>{errorText}</ThemedText>
                                        </ThemedView>
                                    )}
                                </>
                            )}
                        </ThemedView>
                        <Pressable onPress={authMethod === 'send-otp' ? handleRequestOtp : authMethod === 'verify-otp' ? handleVerifyPassword : handleResetPassword} style={[styles.sendButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                            <ThemedText style={[styles.sendButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>{authMethod === 'send-otp' ? 'Send verification' : authMethod === 'verify-otp' ? 'Verify code' : 'Reset password'}</ThemedText>
                        </Pressable>
                    </ThemedView>
                </ThemedView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RequestOtpResetPassword

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