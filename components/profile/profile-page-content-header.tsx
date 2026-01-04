import { Colors } from '@/constants/theme';
import React from 'react';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ProfilePageContentHeader = () => {
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={styles.main}>
            <ThemedView style={styles.topContent}>
                <Image
                    source={{ uri: 'https://pbs.twimg.com/media/Ev8B7cPXMAEDlma.jpg' }}
                    resizeMode='cover'
                    style={[styles.avatar, { borderColor: Colors[colorScheme ?? 'dark'].card }]}
                />
                <ThemedText style={styles.username}>@username</ThemedText>
                <ThemedText style={styles.biography}>
                    Living life one adventure at a time ✨ {'\n'}| Coffee ☕ | Music 🎵 | Good vibes only 🌈
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.paramsContainer}>
                <Pressable style={styles.singleParamContainer}>
                    <ThemedText style={styles.paramNumber}>0</ThemedText>
                    <ThemedText style={styles.paramTitle}>Following</ThemedText>
                </Pressable>
                <ThemedView style={[styles.divider, {backgroundColor: Colors[colorScheme ?? 'dark'].card}]} />
                <Pressable style={styles.singleParamContainer}>
                    <ThemedText style={styles.paramNumber}>0</ThemedText>
                    <ThemedText style={styles.paramTitle}>Followers</ThemedText>
                </Pressable>
                <ThemedView style={[styles.divider, {backgroundColor: Colors[colorScheme ?? 'dark'].card}]} />
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
        borderWidth: 0.5
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
    paramsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        flex: 1,
        padding: 12
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