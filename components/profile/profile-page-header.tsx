import { Colors } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ProfilePageHeader = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <ThemedText style={styles.title}>Profile</ThemedText>
            <ThemedView style={styles.rightSideContainer}>
                <Pressable>
                    <Icon name="more-2-fill" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
                <Pressable>
                    <Icon name="settings-5-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default ProfilePageHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        zIndex: 999
    },
    title: {
        fontWeight: '600',
        fontSize: 24
    },
    rightSideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'transparent'
    }
})