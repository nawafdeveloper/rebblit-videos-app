import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Icon from "react-native-remix-icon";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

interface Props {
    postUrl: string;
    postId: string;
}

const ProfilePageItem = ({ postId, postUrl }: Props) => {
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
        <Pressable onPress={() => router.push({ pathname: '/(tabs)/profile/[postId]', params: { postId: postId } })} style={{ height: 200, width: width / 3 }}>
            {thumbnail && (
                <ImageBackground
                    source={{ uri: thumbnail }}
                    resizeMode='cover'
                    style={{ width: '100%', height: '100%' }}
                >
                    <ThemedView style={styles.topContainer}>
                        <Icon name="eye-fill" size="16" color={Colors.dark.text} fallback={null} />
                        <ThemedText style={styles.text}>342K</ThemedText>
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

export default ProfilePageItem

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gap: 6,
        padding: 6,
        backgroundColor: 'transparent',
        flex: 1,
    },
    text: {
        fontSize: 13,
        fontWeight: '800',
        color: 'white',
        lineHeight: 15
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