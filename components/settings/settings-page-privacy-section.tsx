import { Colors } from '@/constants/theme';
import { authClient } from '@/lib/auth-client';
import { usePrivacySettings } from '@/queries/privacy-settings.query';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    useColorScheme,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPrivacySection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { data: session, isPending } = authClient.useSession();
    const {
        data,
        isLoading,
        isUpdating,
        updateSetting,
    } = usePrivacySettings();

    const [twoFactor, setTwoFactor] = useState(session?.user.twoFactorEnabled);

    useEffect(() => {
        if (session) {
            setTwoFactor(session.user.twoFactorEnabled);
        }
    }, [session]);

    if (isLoading || isPending) {
        return <GlobalLoading />;
    }

    if (!data) {
        return null;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView
                style={[
                    styles.main,
                    { paddingBottom: insets.bottom },
                ]}
            >
                <ThemedView style={styles.item}> 
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>
                            Private account
                        </ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            When your account is private, only approved followers
                            can see your profile and posts.
                        </ThemedText>
                    </ThemedView>

                    <Switch
                        value={data.accountPrivacy === 'private'}
                        disabled={isUpdating}
                        onValueChange={(value) =>
                            updateSetting({
                                accountPrivacy: value
                                    ? 'private'
                                    : 'public',
                            })
                        }
                        trackColor={{
                            true: Colors[colorScheme ?? 'dark'].blue,
                            false: Colors[colorScheme ?? 'dark'].card,
                        }}
                        thumbColor={
                            data.accountPrivacy === 'private'
                                ? Colors.dark.text
                                : Colors[colorScheme ?? 'dark'].lightCard
                        }
                    />
                </ThemedView>
                <Pressable
                    onPress={() => router.push({ pathname: '/(tabs)/profile/settings/[settingId]', params: { settingId: 'Enable Two factor' } })}
                    style={styles.item}>
                    <ThemedView style={styles.itemLeftSide}>
                        <ThemedText style={styles.itemTitle}>
                            Two-Factor Authentication
                        </ThemedText>
                        <ThemedText style={styles.itemDescription}>
                            Add an extra layer of security by requiring a
                            verification code when signing in.
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.itemRightSide}>
                        <ThemedText style={styles.enabledText}>
                            {twoFactor
                                ? 'Enabled'
                                : 'Disabled'}
                        </ThemedText>
                        <Icon
                            name="arrow-right-s-line"
                            size={24}
                            color="gray"
                            fallback={null}
                        />
                    </ThemedView>
                </Pressable>
            </ThemedView>
        </ScrollView>
    );
};

export default SettingsPrivacySection;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    item: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontWeight: '700',
    },
    itemDescription: {
        fontSize: 12,
        color: 'gray',
        lineHeight: 16,
    },
    enabledText: {
        color: 'gray',
        fontSize: 12,
    },
    itemLeftSide: {
        flex: 1,
        gap: 6,
        paddingRight: 12,
    },
    itemRightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
