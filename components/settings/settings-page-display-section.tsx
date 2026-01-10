import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageDisplaySection = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedText style={styles.description}>
                    Choose light, dark, or follow your device’s theme for a comfortable viewing experience.
                </ThemedText>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.itemTitle}>
                        Selected mode
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingsPageDisplaySection

const styles = StyleSheet.create({
    main: {
        flex: 1,
        gap: 24
    },
    description: {
        fontSize: 12,
        color: 'gray',
        minWidth: 0,
        lineHeight: 14,
        paddingHorizontal: 16
    },
    contentContainer: {
        flex: 1,
        gap: 12,
        paddingHorizontal: 16,
    },
    itemTitle: {
        fontWeight: '700',
    },
})