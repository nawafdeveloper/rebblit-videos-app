import { Colors } from '@/constants/theme';
import React from 'react';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../themed-view';

const HomePageHeader = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <Image
                source={colorScheme === 'dark' ? require('@/assets/images/white-logo.png') : require('@/assets/images/black-logo.png')}
                resizeMode='contain'
                style={styles.logo}
            />
            <ThemedView style={styles.rightContainer}>
                <Pressable style={styles.button}>
                    <Icon name="search-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.notfBadge} />
                    <Icon name="notification-3-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default HomePageHeader

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
    logo: {
        width: 69,
        height: 22
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