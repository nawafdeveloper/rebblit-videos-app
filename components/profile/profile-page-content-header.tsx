import { Colors } from '@/constants/theme';
import { useToast } from '@/context/toast-context';
import { authClient } from '@/lib/auth-client';
import { useUserProfileStore } from '@/store/user-profile-store';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ProfilePageContentHeader = () => {
    const colorScheme = useColorScheme();
    const { showToast } = useToast();
    const { data: session, isPending } = authClient.useSession();
    const fetchProfile = useUserProfileStore((s) => s.fetchProfile);
    const profile = useUserProfileStore((s) => s.profile);
    const isLoading = useUserProfileStore((s) => s.isLoading);

    useEffect(() => {
        if (!profile) {
            fetchProfile({ showToast });
        }
    }, [profile]);

    return (
        <ThemedView style={styles.main}>
            <ThemedView style={styles.topContent}>
                {isLoading ? (
                    <ThemedView style={{ backgroundColor: 'transparent' }}>
                        <SkeletonPlaceholder
                            backgroundColor={Colors[colorScheme ?? 'dark'].card}
                            highlightColor={Colors[colorScheme ?? 'dark'].background}
                            angle={45}
                        >
                            <SkeletonPlaceholder.Item
                                width={90}
                                height={90}
                                borderRadius={99}
                            />
                        </SkeletonPlaceholder>
                    </ThemedView>
                ) : (
                    <>
                        {profile?.avatarUrl ? (
                            <Image
                                source={{ uri: profile.avatarUrl }}
                                resizeMode='cover'
                                style={[styles.avatar, { borderColor: Colors[colorScheme ?? 'dark'].card }]}
                            />
                        ) : (
                            <ThemedView style={[styles.avatar, { borderColor: Colors[colorScheme ?? 'dark'].card, backgroundColor: Colors[colorScheme ?? 'dark'].lightCard, overflow: 'hidden' }]}>
                                <ThemedView style={{ backgroundColor: 'transparent', marginTop: 30 }}>
                                    <Icon name="user-fill" size="75" color={Colors[colorScheme ?? 'dark'].background} fallback={null} />
                                </ThemedView>
                            </ThemedView>
                        )}
                    </>
                )}
                {isPending ? (
                    <ThemedView style={{ backgroundColor: 'transparent' }}>
                        <SkeletonPlaceholder
                            backgroundColor={Colors[colorScheme ?? 'dark'].card}
                            highlightColor={Colors[colorScheme ?? 'dark'].background}
                            angle={45}
                        >
                            <SkeletonPlaceholder.Item
                                width={50}
                                height={15}
                                borderRadius={5}
                            />
                        </SkeletonPlaceholder>
                    </ThemedView>
                ) : (
                    <ThemedText style={styles.username}>@{session?.user.username}</ThemedText>
                )}
                {isLoading ? (
                    <ThemedView style={{ backgroundColor: 'transparent' }}>
                        <SkeletonPlaceholder
                            backgroundColor={Colors[colorScheme ?? 'dark'].card}
                            highlightColor={Colors[colorScheme ?? 'dark'].background}
                            angle={45}
                        >
                            <SkeletonPlaceholder.Item
                                width={90}
                                height={15}
                                borderRadius={5}
                            />
                            <SkeletonPlaceholder.Item
                                width={90}
                                height={15}
                                borderRadius={5}
                                style={{ marginTop: 5 }}
                            />
                        </SkeletonPlaceholder>
                    </ThemedView>
                ) : (
                    <>
                        {profile?.biography ? (
                            <ThemedText style={styles.biography}>
                                {profile.biography}
                            </ThemedText>
                        ) : (
                            <Pressable style={[styles.addBioButton, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                                <Icon name="add-line" size="18" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                                <ThemedText style={styles.addBioText}>Add bio</ThemedText>
                            </Pressable>
                        )}
                    </>
                )}
            </ThemedView>
            <ThemedView style={styles.paramsContainer}>
                <Pressable style={styles.singleParamContainer}>
                    <ThemedText style={styles.paramNumber}>0</ThemedText>
                    <ThemedText style={styles.paramTitle}>Following</ThemedText>
                </Pressable>
                <ThemedView style={[styles.divider, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]} />
                <Pressable style={styles.singleParamContainer}>
                    <ThemedText style={styles.paramNumber}>0</ThemedText>
                    <ThemedText style={styles.paramTitle}>Followers</ThemedText>
                </Pressable>
                <ThemedView style={[styles.divider, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]} />
                <Pressable style={styles.singleParamContainer}>
                    <ThemedText style={styles.paramNumber}>0</ThemedText>
                    <ThemedText style={styles.paramTitle}>Posts</ThemedText>
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default ProfilePageContentHeader

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    topContent: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 99,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 14,
        fontWeight: '600'
    },
    biography: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
        lineHeight: 14
    },
    addBioButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 99,
        borderCurve: 'continuous',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    addBioText: {
        fontSize: 14,
        fontWeight: '600'
    },
    paramsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        flex: 1,
        padding: 20
    },
    singleParamContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
    },
    paramNumber: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 18
    },
    paramTitle: {
        fontSize: 12,
        color: 'gray',
        lineHeight: 12
    },
    divider: {
        width: 1,
        height: 12
    }
})