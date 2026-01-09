import { Colors } from '@/constants/theme';
import { addViewEvent, createVideoSession } from '@/lib/video-analytics';
import { Slider } from '@miblanchard/react-native-slider';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import Icon from 'react-native-remix-icon';
import { ThemedText } from '../themed-text';
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
    isFocused: boolean;
}

const VideoItem = ({
    postTitle,
    numbOfLikes,
    numbOfDisLikes,
    username,
    userAvatar,
    postUrl,
    isFocused,
    postId
}: Props) => {
    const { height } = useWindowDimensions();

    const [isPlaying, setIsPlaying] = useState(true);
    const [showIndicator, setShowIndicator] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [isThumbInteractive, setIsThumbInteractive] = useState(false);

    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const updateInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const watchStartRef = useRef<number | null>(null);
    const completedRef = useRef(false);

    const player = useVideoPlayer({ uri: postUrl }, player => {
        player.loop = true;
    });

    useEffect(() => {
        if (!player) return;

        const updateSlider = () => {
            if (!isSliding && player.status === 'readyToPlay') {
                const currentTime = player.currentTime;
                const videoDuration = player.duration;

                if (videoDuration > 0) {
                    setDuration(videoDuration);
                    setSliderValue(currentTime);
                }
            }
        };

        updateInterval.current = setInterval(updateSlider, 100);

        return () => {
            if (updateInterval.current) {
                clearInterval(updateInterval.current);
            }
        };
    }, [player, isSliding]);

    useEffect(() => {
        if (isFocused) {
            player.play();
            setIsPlaying(true);

            if (!sessionIdRef.current) {
                createVideoSession(postId).then(id => {
                    sessionIdRef.current = id;
                    watchStartRef.current = Date.now();
                });
            }
        } else {
            player.pause();
            setIsPlaying(false);

            if (sessionIdRef.current && watchStartRef.current) {
                const watchTime = (Date.now() - watchStartRef.current) / 1000;
                addViewEvent({
                    sessionId: sessionIdRef.current,
                    videoId: postId,
                    watchTime,
                    duration
                });
                sessionIdRef.current = null;
                watchStartRef.current = null;
            }
        }
    }, [isFocused]);

    useEffect(() => {
        if (!player || !sessionIdRef.current) return;

        if (
            player.status === 'readyToPlay' &&
            !completedRef.current &&
            duration > 0 &&
            player.currentTime >= duration * 0.98
        ) {
            completedRef.current = true;

            addViewEvent({
                sessionId: sessionIdRef.current,
                videoId: postId,
                watchTime: duration,
                duration
            });
        }
    }, [player.currentTime, duration]);

    useEffect(() => {
        if (!isFocused) {
            completedRef.current = false;
        }
    }, [isFocused]);

    const triggerIndicator = () => {
        setShowIndicator(true);

        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }

        hideTimeout.current = setTimeout(() => {
            setShowIndicator(false);
        }, 2000);
    };

    const togglePlayback = () => {
        if (isPlaying) {
            player.pause();
            setIsPlaying(false);
            setIsThumbInteractive(true);
        } else {
            player.play();
            setIsPlaying(true);
        }

        triggerIndicator();
    };

    const handleSlidingStart = () => {
        setIsSliding(true);
    };

    useEffect(() => {
        if (isThumbInteractive) {
            setTimeout(() => {
                setIsThumbInteractive(false);
            }, 2000);
        }
    }, [isThumbInteractive]);

    const handleValueChange = (value: number | number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        setIsThumbInteractive(true);
        setSliderValue(newValue);
    };

    const handleSlidingComplete = (value: number | number[]) => {
        const seekTime = Array.isArray(value) ? value[0] : value;
        player.currentTime = seekTime;
        setIsSliding(false);
    };

    return (
        <ThemedView style={styles.main}>
            <VideoView
                style={[styles.video, { height }]}
                player={player}
                nativeControls={false}
                allowsVideoFrameAnalysis={false}
            />
            <ThemedView style={styles.overlayer}>
                <ThemedView style={styles.interactionsContainer}>
                    <ThemedView style={styles.interactionInnerContainer}>
                        <Pressable style={styles.interactionButton}>
                            <Icon
                                name="thumb-up-line"
                                size={26}
                                color={Colors.dark.text}
                            />
                            <ThemedText style={styles.interactionText}>
                                {numbOfLikes}
                            </ThemedText>
                        </Pressable>

                        <Pressable style={styles.interactionButton}>
                            <Icon
                                name="thumb-down-line"
                                size={26}
                                color={Colors.dark.text}
                            />
                            <ThemedText style={styles.interactionText}>
                                {numbOfDisLikes}
                            </ThemedText>
                        </Pressable>

                        <Pressable style={styles.interactionButton}>
                            <Icon
                                name="discuss-line"
                                size={26}
                                color={Colors.dark.text}
                            />
                            <ThemedText style={styles.interactionText}>
                                {numbOfDisLikes}
                            </ThemedText>
                        </Pressable>

                        <Pressable style={styles.interactionButton}>
                            <Icon
                                name="bookmark-line"
                                size={26}
                                color={Colors.dark.text}
                            />
                            <ThemedText style={styles.interactionText}>
                                {numbOfDisLikes}
                            </ThemedText>
                        </Pressable>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.overlayer}>
                <ThemedView style={styles.postDetailsContainer}>
                    <ThemedView style={styles.userInfoContainer}>
                        <Pressable style={styles.usernameContainer}>
                            <Image
                                source={{ uri: userAvatar }}
                                resizeMode="cover"
                                style={styles.avatar}
                            />
                            <ThemedText style={styles.usernameText}>
                                @{username}
                            </ThemedText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.followButton,
                                { backgroundColor: Colors.dark.text }
                            ]}
                        >
                            <ThemedText
                                style={[
                                    styles.followText,
                                    { color: Colors.dark.background }
                                ]}
                            >
                                Follow
                            </ThemedText>
                        </Pressable>
                    </ThemedView>
                    <ThemedText numberOfLines={2} style={styles.postTitle}>
                        {postTitle}
                    </ThemedText>
                </ThemedView>
            </ThemedView>
            <Pressable style={styles.fullOverlay} onPress={togglePlayback}>
                {showIndicator && (
                    <Animated.View
                        entering={ZoomIn.duration(200)}
                        exiting={ZoomOut.duration(200)}
                        key="pause-play"
                        style={styles.centerIndicator}
                    >
                        <Icon
                            name={isPlaying ? 'play-fill' : 'pause-fill'}
                            size={24}
                            color="white"
                        />
                    </Animated.View>
                )}
            </Pressable>
            <ThemedView style={[styles.sliderWrapper, { opacity: isThumbInteractive ? 1 : 0.1 }]}>
                <Slider
                    value={sliderValue}
                    onValueChange={handleValueChange}
                    onSlidingStart={handleSlidingStart}
                    onSlidingComplete={handleSlidingComplete}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="rgba(255,255,255,0.3)"
                    thumbTintColor="#fff"
                    thumbTouchSize={{ height: 10, width: 10 }}
                    thumbStyle={{ width: isThumbInteractive ? 4 : 0, height: isThumbInteractive ? 4 : 0 }}
                    trackStyle={{ height: 2 }}
                />
            </ThemedView>
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
    },
    overlayer: {
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        bottom: 90,
        padding: 16,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    interactionsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    interactionInnerContainer: {
        alignItems: 'center',
        gap: 30,
        paddingBottom: 100,
        backgroundColor: 'transparent'
    },
    interactionButton: {
        alignItems: 'center',
        gap: 8
    },
    interactionText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
        lineHeight: 12
    },
    postDetailsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 10,
        backgroundColor: 'transparent'
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        backgroundColor: 'transparent'
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white'
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 99
    },
    followButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 18
    },
    followText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white'
    },
    postTitle: {
        fontSize: 14,
        color: 'white'
    },
    fullOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerIndicator: {
        padding: 20,
        borderRadius: 99,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    sliderWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 72,
        zIndex: 3,
        backgroundColor: 'transparent'
    }
});