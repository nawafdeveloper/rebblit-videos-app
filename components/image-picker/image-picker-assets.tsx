import { Colors } from '@/constants/theme';
import useImageStore from '@/store/create-post-store';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ImagePickerAssets = () => {
    const { fetchAssets, assets, selectVideoAsset } = useImageStore();
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const [selectedVideo, setSelectedVide] = useState('');

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleSelectVideo = (id: string) => {
        setSelectedVide(id);
    }

    const handleNext = () => {
        if (!selectedVideo) {
            return null;
        }

        selectVideoAsset(selectedVideo);
    };

    return (
        <ThemedView style={styles.main}>
            <FlatList
                data={assets}
                keyExtractor={(item) => item.id}
                numColumns={4}
                removeClippedSubviews={true}
                windowSize={7}
                initialNumToRender={12}
                maxToRenderPerBatch={12}
                scrollEventThrottle={16}
                contentContainerStyle={{ gap: 1, flex: 1 }}
                columnWrapperStyle={{ gap: 1 }}
                renderItem={({ item }) => (
                    <Pressable
                        style={{ position: 'relative' }}
                        onPress={() => handleSelectVideo(item.id)}
                    >
                        {selectedVideo === item.id && (
                            <ThemedView
                                style={[styles.checkboxContainer, {
                                    backgroundColor: 'rgba(0,0,0,0.3)'
                                }]}
                            >
                                <Icon name="checkbox-circle-fill" size="24" color={Colors.dark.text} fallback={null} />
                            </ThemedView>
                        )}
                        <Image
                            source={{ uri: item.thumbnailUri }}
                            resizeMode="cover"
                            style={{ height: width / 4, width: width / 4 }}
                        />
                    </Pressable>
                )}
            />
            <ThemedView style={[styles.footerContainer, { paddingBottom: insets.bottom * 2 }]}>
                <ThemedText style={styles.description}>Select your video and click next</ThemedText>
                <Pressable onPress={handleNext} disabled={!selectedVideo} style={[styles.nextButton, { backgroundColor: !selectedVideo ? Colors[colorScheme ?? 'dark'].card : Colors[colorScheme ?? 'dark'].text, }]}>
                    <ThemedText style={[styles.nextButtonText, { color: !selectedVideo ? 'gray' : Colors[colorScheme ?? 'dark'].background }]}>Next</ThemedText>
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default ImagePickerAssets

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    checkboxContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    checkbox: {
        width: 15,
        height: 15,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    description: {
        color: 'gray'
    },
    nextButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    nextButtonText: {
        fontWeight: '600'
    }
})