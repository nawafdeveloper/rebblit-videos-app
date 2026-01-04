import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ImagePickerHeader = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <Pressable onPress={() => router.back()}>
                <Icon name="close-large-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
            </Pressable>
            <ThemedText style={styles.title}>Select video</ThemedText>
        </ThemedView>
    )
}

export default ImagePickerHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    title: {
        fontWeight: '600'
    }
})