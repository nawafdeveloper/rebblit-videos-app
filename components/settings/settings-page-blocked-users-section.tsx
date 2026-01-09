import { Colors } from '@/constants/theme';
import React from 'react';
import { Image, Platform, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageBlockedUsersSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
            <ThemedText style={styles.description}>
                Blocked users won’t be able to view your profile or interact with you. You can unblock someone at any time if you change your mind.
            </ThemedText>
            <ThemedView style={[styles.inputConteiner, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                <Icon name="search-line" size="18" color={Colors[colorScheme ?? 'dark'].tabIconDefault} fallback={null} />
                <TextInput
                    placeholder='Search for user profile'
                    style={{ color: Colors[colorScheme ?? 'dark'].text, flex: 1 }}
                    placeholderTextColor={Colors[colorScheme ?? 'dark'].tabIconDefault}
                />
            </ThemedView>
            <ThemedView style={styles.emptyContainer}>
                <Image
                    source={
                        colorScheme === 'dark' ? require('@/assets/images/empty-state-black.png') :
                            require('@/assets/images/empty-state-white.png')
                    }
                    resizeMode='cover'
                    style={styles.emptyImage}
                />
                <ThemedText style={styles.emptyText}>
                    There is no blocked users for now
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default SettingsPageBlockedUsersSection

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
    inputConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 18,
        paddingVertical: Platform.OS === 'android' ? 2 : 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        marginHorizontal: 16
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    },
    emptyImage: {
        width: 200,
        height: 200
    }
})