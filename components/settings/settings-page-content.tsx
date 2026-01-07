import { Colors } from '@/constants/theme';
import { useLogout } from '@/hooks/use-logout';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageContent = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { handleLogout } = useLogout();

    const pressRouting = (settingId: string) => {
        router.push({ pathname: '/(tabs)/profile/settings/[settingId]', params: { settingId: settingId } })
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedText style={styles.title}>Account</ThemedText>
                <Pressable onPress={() => pressRouting('Account settings')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="user-settings-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Account settings</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Privacy settings')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="lock-2-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Privacy settings</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Blocked users')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="prohibited-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Blocked users</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Your activities')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="bar-chart-box-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Your activities</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <ThemedView style={[styles.divider, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]} />
                <ThemedText style={styles.title}>General</ThemedText>
                <Pressable onPress={() => pressRouting('Notifications')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="notification-3-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Notifications</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Playback')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="live-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Playback</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Language')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="translate-2" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Language</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Display')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="moon-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Display</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <ThemedView style={[styles.divider, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]} />
                <ThemedText style={styles.title}>Support</ThemedText>
                <Pressable onPress={() => pressRouting('Help center')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="questionnaire-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Help center</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Terms & policy')} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="shake-hands-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Terms & policy</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <ThemedView style={[styles.divider, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]} />
                <Pressable onPress={handleLogout} style={styles.buttonContainer}>
                    <ThemedView style={styles.leftContainer}>
                        <Icon name="logout-box-r-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedText>Logout account</ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingsPageContent

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    title: {
        padding: 16,
        fontWeight: '700'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    divider: {
        marginVertical: 16,
        width: '100%',
        height: 6
    }
})