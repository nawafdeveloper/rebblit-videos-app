import { Colors } from '@/constants/theme';
import { usePrivacySettings } from '@/queries/privacy-settings.query';
import React from 'react';
import { ScrollView, StyleSheet, Switch, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPrivacySection = () => {
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
                    <ThemedText style={styles.itemTitle}>Private account</ThemedText>
                    <Switch
                        value={data.accountPrivacy === 'private'}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({
                                accountPrivacy: value ? "private" : "public",
                            })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={data.accountPrivacy === 'private' ? Colors.dark.text : Colors[colorScheme ?? 'dark'].lightCard}
                    />
                </ThemedView>
                <ThemedText style={styles.itemDescription}>
                    When your account is public, your profile and posts can be seen by anyone, you can make your account private or public by toggling the switch.
                </ThemedText>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingsPrivacySection

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    itemContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        paddingHorizontal: 16
    },
})