import React from 'react';
import { ScrollView, StyleSheet, Switch, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPlaybackSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme(); 

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Autoplay next video</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            When autoplay is enabled, a suggested video will automatically play next
                        </ThemedText>
                    </ThemedView>
                    <Switch />
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Auto-mute videos</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Videos will start muted by default. You can turn sound on at any time.
                        </ThemedText>
                    </ThemedView>
                    <Switch />
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Enable HDR</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Play supported videos in high dynamic range for improved contrast and colors.
                        </ThemedText>
                    </ThemedView>
                    <Switch />
                </ThemedView>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingsPlaybackSection

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    headingContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8
    },
    title: {
        paddingHorizontal: 16,
        paddingTop: 16,
        fontWeight: '700',
        fontSize: 18
    },
    description: {
        fontSize: 14,
        color: 'gray',
        minWidth: 0,
        paddingHorizontal: 16,
        lineHeight: 16
    },
    divider: {
        marginVertical: 16,
        width: '100%',
        height: 2
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