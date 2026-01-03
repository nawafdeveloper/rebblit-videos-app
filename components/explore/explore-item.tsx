import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Icon from "react-native-remix-icon";
import { ThemedView } from '../themed-view';

interface Props {
    postUrl: string;
    postId: string;
}

const ExploreItem = ({ postId, postUrl }: Props) => {
    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();

    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateThumbnail = async () => {
        try {
            if (!postUrl) {
                return;
            }
            setLoading(true);

            const { uri } = await VideoThumbnails.getThumbnailAsync(
                postUrl,
                {
                    time: 10,
                }
            );

            setThumbnail(uri);
        } catch (e) {
            console.warn(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!postUrl) return;

        generateThumbnail();
    }, [postUrl]);

    return (
        <Pressable onPress={() => router.push({ pathname: '/(tabs)/explore/[postId]', params: { postId: postId } })} style={[styles.main, { width: (width / 3) - 1, height: (width / 2) - 1 }]}>
            {thumbnail && (
                <ImageBackground
                    source={{ uri: thumbnail }}
                    resizeMode='cover'
                    style={{ width: '100%', height: '100%' }}
                >
                    <ThemedView style={styles.topContainer}>
                        <ThemedView style={styles.iconContainer}>
                            <Icon name="play-mini-fill" size="14" color={Colors.dark.background} fallback={null} />
                        </ThemedView>
                    </ThemedView>
                </ImageBackground>
            )}
            {loading && (
                <ThemedView style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme ?? 'dark'].card }}>
                    <ActivityIndicator size={'small'} color={Colors[colorScheme ?? 'dark'].text} />
                </ThemedView>
            )}
        </Pressable>
    )
}

export default ExploreItem

const styles = StyleSheet.create({
    main: {
        margin: 0.5,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 12,
        backgroundColor: 'transparent'
    },
    iconContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 2,
        paddingVertical: 1,
        borderRadius: 5,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center'
    }
})