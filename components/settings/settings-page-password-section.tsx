import { Colors } from '@/constants/theme';
import { useUpdatePassword } from '@/hooks/use-update-password';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPagePasswordSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const {
        currentPass,
        setCurrentPass,
        newPass,
        setNewPass,
        confirmNewPass,
        setConfirmNewPass,
        isError,
        errorText,
        handleChangePassword
    } = useUpdatePassword();

    const [currentShown, setCurrentShown] = useState(false);
    const [newShown, setNewShown] = useState(false);
    const [confShown, setConfShown] = useState(false);

    const toggleCurrent = () => setCurrentShown(prev => !prev);
    const toggleNew = () => setNewShown(prev => !prev);
    const toggleConfirm = () => setConfShown(prev => !prev);

    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ backgroundColor: Colors[colorScheme ?? 'dark'].background, flex: 1 }}
                behavior='padding'
                keyboardVerticalOffset={0}
            >
                <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                    <ThemedView style={styles.itemContainer}>
                        <ThemedText style={styles.itemTitle}>Change password</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Update your password to keep your account secure. Choose a strong password that you don’t use elsewhere, and make sure to remember it for future logins.
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.contentContainer}>
                        <ThemedText style={styles.label}>Current password</ThemedText>
                        <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                            <TextInput
                                value={currentPass}
                                onChangeText={setCurrentPass}
                                placeholder='********'
                                secureTextEntry={!currentShown}
                                placeholderTextColor={'gray'}
                                style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                            />
                            <Pressable onPress={toggleCurrent}>
                                <Icon name={currentShown ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                            </Pressable>
                        </ThemedView>
                        <ThemedText style={styles.itemDescription}>
                            Provide your current password to confirm that you own this account, if you forgot it you can reset your password from forgot password on login page.
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.contentContainer}>
                        <ThemedText style={styles.label}>New Password</ThemedText>
                        <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                            <TextInput
                                value={newPass}
                                onChangeText={setNewPass}
                                placeholder='********'
                                secureTextEntry={!newShown}
                                placeholderTextColor={'gray'}
                                style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                            />
                            <Pressable onPress={toggleNew}>
                                <Icon name={newShown ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                            </Pressable>
                        </ThemedView>
                    </ThemedView>
                    <ThemedView style={styles.contentContainer}>
                        <ThemedText style={styles.label}>Confirm new password</ThemedText>
                        <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                            <TextInput
                                value={confirmNewPass}
                                onChangeText={setConfirmNewPass}
                                placeholder='********'
                                secureTextEntry={!confShown}
                                placeholderTextColor={'gray'}
                                style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                            />
                            <Pressable onPress={toggleConfirm}>
                                <Icon name={confShown ? 'eye-off-line' : 'eye-line'} size="20" color='gray' fallback={null} />
                            </Pressable>
                        </ThemedView>
                    </ThemedView>
                    {isError && (
                        <ThemedView style={styles.errorContainer}>
                            <Icon name="information-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                            <ThemedText style={styles.errorText}>{errorText}</ThemedText>
                        </ThemedView>
                    )}
                    <Pressable onPress={handleChangePassword} style={[styles.changePassButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                        <ThemedText style={[styles.changePassButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Change password</ThemedText>
                    </Pressable>
                </ThemedView>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default SettingsPagePasswordSection

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 16
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8
    },
    itemTitle: {
        fontWeight: '700'
    },
    itemDescription: {
        fontSize: 12,
        color: 'gray',
        minWidth: 0,
        lineHeight: 14,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 6,
        paddingTop: 24
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
    changePassButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    changePassButtonText: {
        fontWeight: '600'
    }
})