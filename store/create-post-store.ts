import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { create } from 'zustand';

export type MediaInfo = {
    mediaName: string | null;
    mediaDuration: number | null;
    uri: string;
    height: number | null;
    width: number | null;
};

interface ImageStore {
    media: string | null;
    mediaInfo: MediaInfo | null;

    assets: { id: string; thumbnailUri: string }[];

    fetchAssets: () => Promise<void>;
    selectVideoAsset: (assetId: string) => Promise<void>;
}

const useImageStore = create<ImageStore>((set, get) => ({
    media: null,
    mediaInfo: null,
    assets: [],

    fetchAssets: async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission required',
                'Permission to access the media library is required.'
            );
            return;
        }

        const result = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.video,
            sortBy: [MediaLibrary.SortBy.creationTime],
            first: 500,
        });

        const assetsWithThumbs = await Promise.all(
            result.assets.map(async (asset) => {
                const info = await MediaLibrary.getAssetInfoAsync(asset.id);
                return {
                    id: asset.id,
                    thumbnailUri: info.localUri ?? asset.uri,
                };
            })
        );

        set({ assets: assetsWithThumbs });
    },

    selectVideoAsset: async (assetId: string) => {
        try {
            const info = await MediaLibrary.getAssetInfoAsync(assetId);

            const mediaInfo: MediaInfo = {
                mediaName: info.filename ?? null,
                mediaDuration: info.duration ?? null,
                uri: info.uri,
                height: info.height ?? null,
                width: info.width ?? null,
            };

            set({
                media: info.uri,
                mediaInfo,
            });

            router.push('/create-post');
        } catch (error) {
            console.error('Failed to select video asset:', error);
        }
    },
}));

export default useImageStore;
