import { Colors } from '@/constants/theme';
import { usePrivacySettings } from '@/queries/privacy-settings.query';
import React from 'react';
import { ScrollView, StyleSheet, Switch, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPlaybackSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const {
        data,
        isLoading,
        isUpdating,
        updateSetting,
    } = usePrivacySettings();

    if (isLoading) {
        return <GlobalLoading />
    }

    if (!data) {
        return null;
    }

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
                    <Switch
                        value={data.autoPlayVideo}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({
                                autoPlayVideo: value
                            })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={data.autoPlayVideo ? Colors.dark.text : Colors[colorScheme ?? 'dark'].lightCard}
                    />
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Auto-mute videos</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Videos will start muted by default. You can turn sound on at any time.
                        </ThemedText>
                    </ThemedView>
                    <Switch
                        value={data.autoMuteVideo}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({
                                autoMuteVideo: value
                            })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={data.autoMuteVideo ? Colors.dark.text : Colors[colorScheme ?? 'dark'].lightCard}
                    />
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>Enable HDR</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Play supported videos in high dynamic range for improved contrast and colors.
                        </ThemedText>
                    </ThemedView>
                    <Switch
                        value={data.enableHdr}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({
                                enableHdr: value
                            })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={data.enableHdr ? Colors.dark.text : Colors[colorScheme ?? 'dark'].lightCard}
                    />
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