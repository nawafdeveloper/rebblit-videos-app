import { Colors } from '@/constants/theme';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsYourActivitiesSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.leftSideContainer}>
                        <Icon name="thumb-up-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedView style={styles.itemContainer}>
                            <ThemedText style={styles.itemTitle}>Video you liked</ThemedText>
                            <ThemedText style={styles.itemDescription}>
                                Videos you’ve liked will be saved here so you can easily find and watch them again.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color='gray' fallback={null} />
                </Pressable>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.leftSideContainer}>
                        <Icon name="chat-3-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedView style={styles.itemContainer}>
                            <ThemedText style={styles.itemTitle}>Comments</ThemedText>
                            <ThemedText style={styles.itemDescription}>
                                View and manage comments you’ve made on videos.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color="gray" fallback={null} />
                </Pressable>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.leftSideContainer}>
                        <Icon name="thumb-down-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedView style={styles.itemContainer}>
                            <ThemedText style={styles.itemTitle}>Videos you disliked</ThemedText>
                            <ThemedText style={styles.itemDescription}>
                                Videos you’ve disliked are saved here to help improve recommendations.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color="gray" fallback={null} />
                </Pressable>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.leftSideContainer}>
                        <Icon name="bookmark-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedView style={styles.itemContainer}>
                            <ThemedText style={styles.itemTitle}>Saved videos</ThemedText>
                            <ThemedText style={styles.itemDescription}>
                                Videos you’ve saved to watch later will appear here.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color="gray" fallback={null} />
                </Pressable>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.leftSideContainer}>
                        <Icon name="heart-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedView style={styles.itemContainer}>
                            <ThemedText style={styles.itemTitle}>Interested</ThemedText>
                            <ThemedText style={styles.itemDescription}>
                                Videos you marked as interesting to get more similar recommendations.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color="gray" fallback={null} />
                </Pressable>
                <Pressable style={styles.button}>
                    <ThemedView style={styles.leftSideContainer}>
                        <Icon name="close-circle-line" size="20" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                        <ThemedView style={styles.itemContainer}>
                            <ThemedText style={styles.itemTitle}>Not interested</ThemedText>
                            <ThemedText style={styles.itemDescription}>
                                Videos you’re not interested in to better tailor your recommendations.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <Icon name="arrow-right-s-line" size="24" color="gray" fallback={null} />
                </Pressable>
            </ThemedView>
        </ScrollView>
    )
}

export default SettingsYourActivitiesSection

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
    button: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftSideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    itemContainer: {
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