import CreatePageContent from '@/components/create/create-page-content';
import CreatePageHeader from '@/components/create/create-page-header';
import { ThemedView } from '@/components/themed-view';
import useImageStore from '@/store/create-post-store';
import * as VideoThumbnails from 'expo-video-thumbnails';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const CreatePostPage = () => {
    const { mediaInfo } = useImageStore();

    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const generateThumbnail = async () => {
        try {
            if (!mediaInfo) {
                return;
            }
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                mediaInfo?.uri,
                {
                    time: 10,
                }
            );
            setThumbnail(uri);
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        if (!mediaInfo?.uri) return;

        generateThumbnail();
    }, [mediaInfo?.uri]);

    return (
        <ThemedView style={styles.main}>
            <CreatePageHeader />
            <CreatePageContent
                thumbnail={thumbnail}
                duration={mediaInfo?.mediaDuration}
            />
        </ThemedView>
    );
};

export default CreatePostPage;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    loader: {
        marginVertical: 20,
    },
});