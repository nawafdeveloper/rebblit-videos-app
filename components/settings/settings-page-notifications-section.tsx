import { Colors } from '@/constants/theme';
import { usePrivacySettings } from '@/queries/privacy-settings.query';
import React from 'react';
import { ScrollView, StyleSheet, Switch, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageNotificationsSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const {
        data,
        isLoading,
        isUpdating,
        updateSetting,
    } = usePrivacySettings();

    if (isLoading) {
        return <GlobalLoading />;
    }

    if (!data) {
        return null;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>

                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>New comments</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Get notified whenever someone leaves a new comment on your posts.
                        </ThemedText>
                    </ThemedView>
                    <Switch
                        value={data.newCommentNotification}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({ newCommentNotification: value })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={
                            data.newCommentNotification
                                ? Colors.dark.text
                                : Colors[colorScheme ?? 'dark'].lightCard
                        }
                    />
                </ThemedView>

                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>New followers</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Receive notifications when someone starts following you.
                        </ThemedText>
                    </ThemedView>
                    <Switch
                        value={data.newFollowNotification}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({ newFollowNotification: value })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={
                            data.newFollowNotification
                                ? Colors.dark.text
                                : Colors[colorScheme ?? 'dark'].lightCard
                        }
                    />
                </ThemedView>

                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>New likes</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Be notified when someone likes your content.
                        </ThemedText>
                    </ThemedView>
                    <Switch
                        value={data.newLikeNotification}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({ newLikeNotification: value })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={
                            data.newLikeNotification
                                ? Colors.dark.text
                                : Colors[colorScheme ?? 'dark'].lightCard
                        }
                    />
                </ThemedView>

                <ThemedView style={styles.itemContainer}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>New dislikes</ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Get alerts when someone dislikes your content.
                        </ThemedText>
                    </ThemedView>
                    <Switch
                        value={data.newDislikeNotification}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({ newDislikeNotification: value })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={
                            data.newDislikeNotification
                                ? Colors.dark.text
                                : Colors[colorScheme ?? 'dark'].lightCard
                        }
                    />
                </ThemedView>

            </ThemedView>
        </ScrollView>
    );
};

export default SettingsPageNotificationsSection;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    itemContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemLeftSide: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
        flex: 1,
        paddingRight: 12,
    },
    itemTitle: {
        paddingTop: 16,
        fontWeight: '700',
    },
    itemDescription: {
        fontSize: 12,
        color: 'gray',
        lineHeight: 14,
    },
});
