import { Colors } from '@/constants/theme';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Icon from "react-native-remix-icon";
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
        <Pressable style={{ height: 200, width: width / 3 }}>
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
                <ThemedView style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme ?? 'dark'].card }}>
                    <ActivityIndicator size={'small'} color={Colors[colorScheme ?? 'dark'].text} />
                </ThemedView>
            )}
        </Pressable>
    )
}

export default ProfilePageItem

const styles = StyleSheet.create({
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