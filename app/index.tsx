import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainPage = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={styles.main}>
            <Image
                source={colorScheme === 'dark' ? require('@/assets/images/white-logo.png') : require('@/assets/images/black-logo.png')}
                resizeMode='cover'
                style={styles.logo}
            />
            <ThemedView style={{ flex: 1 }} />
            <ThemedView style={styles.bottomContainer}>
                <Pressable onPress={() => router.push('/signup')} style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                    <ThemedText style={styles.buttonText}>Create new account</ThemedText>
                </Pressable>
                <Pressable onPress={() => router.push('/login')} style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                    <ThemedText style={styles.buttonText}>Login to exist account</ThemedText>
                </Pressable>
                <ThemedText style={styles.agreementText}>
                    By continuing, you agree to our Terms of Service and Privacy Policy, and accept responsibility for keeping your account information secure.
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default MainPage

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 120,
        paddingTop: 170
    },
    logo: {
        width: 191.29,
        height: 40,
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%'
    },
    button: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        fontWeight: '600'
    },
    agreementText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
        color: 'gray'
    }
})
