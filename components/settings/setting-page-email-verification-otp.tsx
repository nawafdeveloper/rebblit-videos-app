import { Colors } from '@/constants/theme';
import { useConfirmEmail } from '@/hooks/use-confirm-email';
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingPageEmailVerificationOtp = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { data: session, isPending } = authClient.useSession();
    const {
        otp,
        setOtp,
        errorText,
        isError,
        handleVerifyOtp
    } = useConfirmEmail();

    if (isPending) {
        return <GlobalLoading />
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Verification code</ThemedText>
                    <ThemedText style={styles.description}>
                        We have send you a verification code to your email address {session?.user.email}, please enter the code here.
                    </ThemedText>
                    <ThemedView
                        style={[
                            styles.inputContainer,
                            {
                                borderBottomColor:
                                    Colors[colorScheme ?? 'dark'].lightCard,
                            },
                        ]}
                    >
                        <TextInput
                            value={otp}
                            onChangeText={setOtp}
                            style={styles.input}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            keyboardType='numeric'
                            maxLength={6}
                        />
                    </ThemedView>
                    {isError && (
                        <ThemedView style={styles.errorContainer}>
                            <Icon name="information-line" size="26" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                            <ThemedText style={styles.errorText}>{errorText}</ThemedText>
                        </ThemedView>
                    )}
                </ThemedView>
                <Pressable
                    style={[
                        styles.verifyButton,
                        { backgroundColor: Colors[colorScheme ?? 'dark'].text },
                    ]}
                    onPress={() => handleVerifyOtp(session?.user.email || '')}
                >
                    <ThemedText
                        style={[
                            styles.verifyButtonText,
                            { color: Colors[colorScheme ?? 'dark'].background },
                        ]}
                    >
                        Verify now
                    </ThemedText>
                </Pressable>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingPageEmailVerificationOtp

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 6,
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
    description: {
        fontSize: 12,
        color: 'gray',
        minWidth: 0,
        lineHeight: 14,
        maxWidth: 350
    },
    verifyButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 16
    },
    verifyButtonText: {
        fontWeight: '600'
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
})