import { Colors } from '@/constants/theme';
import React, { useMemo } from 'react';
import { ImageBackground, Keyboard, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

interface Props {
    thumbnail: string | null;
    duration: number | null | undefined;
}

const CreatePageContent = ({ thumbnail, duration }: Props) => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();

    const formattedDuration = useMemo(() => {
        if (!duration) return '';
        const totalSeconds = Math.floor(duration / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '')}:${String(seconds).padStart(2, '0')}`;
    }, [duration]);

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleDismissKeyboard} style={styles.main}>
            <ThemedView style={styles.main}>
                <ThemedView style={[styles.topContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].card }]}>
                    {thumbnail && (
                        <ImageBackground
                            source={{ uri: thumbnail }}
                            resizeMode="cover"
                            style={styles.thumbnail}
                        >
                            <ThemedView style={styles.innerContainer}>
                                {duration && (
                                    <ThemedView style={styles.videoDurationContainer}>
                                        <ThemedText style={styles.videoDurationText}>
                                            {formattedDuration}
                                        </ThemedText>
                                    </ThemedView>
                                )}
                            </ThemedView>
                        </ImageBackground>
                    )}
                    <ThemedView style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                            placeholder='Write your caption'
                            multiline
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={[styles.optionContainer, {backgroundColor: Colors[colorScheme ?? 'dark'].card}]}>
                    <Icon name="global-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                    <ThemedView style={styles.optionContentContainer}>
                        <ThemedText style={styles.optionContentTitle}>Visibility</ThemedText>
                        <ThemedText style={styles.optionContentDescription}>Public</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
                    <ThemedText style={styles.agreement}>By uploading, you confirm you have the right to share this content and take full responsibility for it.</ThemedText>
                    <Pressable style={[styles.uploadButton, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                        <ThemedText style={[styles.uploadButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Upload content</ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

export default CreatePageContent

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 16,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        borderBottomWidth: 1,
        paddingBottom: 20
    },
    thumbnail: {
        width: 100,
        height: 160,
        borderRadius: 10,
        borderCurve: 'continuous',
        overflow: 'hidden',
        position: 'relative'
    },
    innerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 4,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    videoDurationContainer: {
        paddingHorizontal: 6,
        borderRadius: 5,
        borderCurve: 'continuous',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    videoDurationText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 6
    },
    input: {
        flex: 1,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        borderRadius: 99,
        borderCurve: 'continuous',
        marginTop: 20
    },
    optionContentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
        paddingVertical: 10,
        backgroundColor: 'transparent'
    },
    optionContentTitle: {
        fontSize: 12,
        color: 'gray',
        lineHeight: 12
    },
    optionContentDescription: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 14
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 16
    },
    agreement: {
        fontSize: 12,
        color: 'gray',
        lineHeight: 14
    },
    uploadButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    uploadButtonText: {
        fontWeight: '600'
    }
})