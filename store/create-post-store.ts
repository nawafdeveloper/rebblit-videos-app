import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { create } from 'zustand';

type MediaInfo = {
    mediaName: string | null;
    mediaSize: number | null;
    mediaDuration: number | null;
    uri: string;
    height: number | null;
    width: number | null;
};

interface ImageStore {
    media: string | null;
    mediaInfo: MediaInfo | null;
    setMedia: (uri: string) => void;
    setMediaInfo: (info: MediaInfo) => void;
    pickImage: () => Promise<void>;
}

const useImageStore = create<ImageStore>((set) => ({
    media: null,
    mediaInfo: null,

    setMedia: (uri) => set({ media: uri }),
    setMediaInfo: (info) => set({ mediaInfo: info }),

    pickImage: async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                'Permission required',
                'Permission to access the media library is required.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'videos',
            defaultTab: 'photos',
            allowsMultipleSelection: false,
            preferredAssetRepresentationMode: ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.IFrame1280x720,
            allowsEditing: false,
            quality: 0.1,
            videoMaxDuration: 180,
        });

        if (result.canceled) return;

        const asset = result.assets[0];

        const mediaInfo: MediaInfo = {
            mediaName: asset.fileName ?? null,
            mediaSize: asset.fileSize ?? null,
            mediaDuration: asset.duration ?? null,
            uri: asset.uri,
            height: asset.height ?? null,
            width: asset.width ?? null,
        };

        set({
            media: asset.uri,
            mediaInfo,
        });

        router.push('/create-post');
    },
}));

export default useImageStore;
