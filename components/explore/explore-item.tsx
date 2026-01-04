import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Icon from "react-native-remix-icon";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
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
        <Pressable onPress={() => router.push({ pathname: '/(tabs)/explore/[postId]', params: { postId: postId } })} style={[styles.main, { height: 200, width: width / 3 }]}>
            {thumbnail && (
                <ImageBackground
                    source={{ uri: thumbnail }}
                    resizeMode='cover'
                    style={{ width: '100%', height: '100%' }}
                >
                    <ThemedView style={styles.topContainer}>
                        <Icon name="play-circle-fill" size="18" color={Colors.dark.text} fallback={null} />
                    </ThemedView>
                </ImageBackground>
            )}
            {loading && (
                <SkeletonPlaceholder
                    backgroundColor={Colors[colorScheme ?? 'dark'].card}
                    highlightColor={Colors[colorScheme ?? 'dark'].background}
                    angle={45}
                >
                    <SkeletonPlaceholder.Item
                        width={width / 3}
                        height={200}
                        borderRadius={0}
                    />
                </SkeletonPlaceholder>
            )}
        </Pressable>
    )
}

export default ExploreItem

const styles = StyleSheet.create({
    main: {

    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 6,
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