import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../themed-view';

const SettingsPageBlockedUsersSection = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>

            </ThemedView>
        </ScrollView>
    )
}

export default SettingsPageBlockedUsersSection

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
})