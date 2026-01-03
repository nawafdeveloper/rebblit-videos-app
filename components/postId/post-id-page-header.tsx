import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../themed-view';

const PostIdPageHeader = () => {
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <Pressable onPress={() => router.back()} style={styles.button}>
                    <Icon name="arrow-left-line" size="24" color={Colors.dark.text} fallback={null} />
                </Pressable>
            <ThemedView style={styles.rightContainer}>
                <Pressable style={styles.button}>
                    <Icon name="more-2-line" size="24" color={Colors.dark.text} fallback={null} />
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default PostIdPageHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    title: {
        fontWeight: '600',
        color: 'white',
        fontSize: 24
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'transparent'
    },
    button: {
        position: 'relative'
    },
    notfBadge: {
        position: 'absolute',
        top: 1,
        right: 1,
        width: 7,
        height: 7,
        borderRadius: 99,
        backgroundColor: 'red',
        zIndex: 1
    }
})