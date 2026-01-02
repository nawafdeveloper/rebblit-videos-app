import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedView } from '../themed-view';

interface Props {
    postId: string;
    postTitle: string;
    postThumbnail: string;
    numbOfLikes: number;
    numbOfDisLikes: number;
    numberOfComments: number;
    username: string;
    userAvatar: string;
    postUrl: string;
    isFocused: boolean; // new
}

const VideoItem = ({
    postId,
    postTitle,
    postThumbnail,
    numbOfLikes,
    numbOfDisLikes,
    username,
    userAvatar,
    postUrl,
    isFocused
}: Props) => {
    const { height } = useWindowDimensions();

    const player = useVideoPlayer({ uri: postUrl }, player => {
        player.loop = true;
    });

    // Play or pause depending on focus
    useEffect(() => {
        if (isFocused) {
            player.play();
        } else {
            player.pause();
        }
    }, [isFocused]);

    return (
        <ThemedView style={styles.main}>
            <VideoView
                style={[styles.video, { height }]}
                player={player}
                nativeControls={false}
            />
        </ThemedView>
    );
};

export default VideoItem;

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    video: {
        width: '100%',
        backgroundColor: 'black'
    }
});
