import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageAccountSection = () => {
    const insets = useSafeAreaInsets();

    const pressRouting = (settingId: string) => {
        router.push({ pathname: '/(tabs)/profile/settings/[settingId]', params: { settingId: settingId } })
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <Pressable onPress={() => pressRouting('Account information')} style={styles.itemContainer}>
                    <ThemedText style={styles.itemTitle}>Account information</ThemedText>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Password')} style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Password</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Tap to modify your current account password
                        </ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable onPress={() => pressRouting('Edit profile')} style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Edit profile</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Tap to modify profile page information
                        </ThemedText>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable style={styles.itemContainer}>
                    <ThemedText style={styles.itemTitle}>Deactivate or delete account</ThemedText>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingsPageAccountSection

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    itemContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemLeftSide: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8
    },
    itemTitle: {
        paddingTop: 16,
        fontWeight: '700'
    },
    itemDescription: {
        fontSize: 12,
        color: 'gray',
        minWidth: 0,
        lineHeight: 14,
        maxWidth: 300
    },
})