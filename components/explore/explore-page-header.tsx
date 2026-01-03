import { Colors } from '@/constants/theme';
import React from 'react';
import { Platform, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../themed-view';

const ExplorePageHeader = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top, borderBottomColor: Colors[colorScheme ?? 'dark'].card }]}>
            <ThemedView style={[styles.inputConteiner, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                <TextInput
                    placeholder='Search for content'
                    style={{ color: Colors[colorScheme ?? 'dark'].text }}
                    placeholderTextColor={Colors[colorScheme ?? 'dark'].tabIconDefault}
                />
            </ThemedView>
        </ThemedView>
    )
}

export default ExplorePageHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1
    },
    inputConteiner: {
        paddingHorizontal: 18,
        paddingVertical: Platform.OS === 'android' ? 3 : 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        flex: 1
    }
})