import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

interface Props {
    title: string;
}

const SettingIdHeader = ({ title }: Props) => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top * 1.2 }]}>
            <Pressable onPress={() => router.back()}>
                <Icon name="arrow-left-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
            </Pressable>
            <ThemedView style={[styles.titleContainer, { top: insets.top * 1.2 }]} pointerEvents='none'>
                <ThemedText style={styles.title}>{title}</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default SettingIdHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        zIndex: 999,
        position: 'relative'
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    title: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18
    },
})