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
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <Pressable onPress={() => router.back()}>
                <Icon name="arrow-left-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
            </Pressable>
            <ThemedText style={styles.title}>{title}</ThemedText>
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
        zIndex: 999
    },
    title: {
        fontWeight: '600',
        fontSize: 24
    },
})