import { BlurView } from '@sbaiahmed1/react-native-blur';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Image, Modal, StyleSheet, TouchableWithoutFeedback, useColorScheme } from 'react-native';

type ImageOverlayContextType = {
    showImage: (uri: string) => void;
    hideImage: () => void;
};

const ImageOverlayContext = createContext<ImageOverlayContextType | undefined>(undefined);

export const useImageOverlay = () => {
    const context = useContext(ImageOverlayContext);
    if (!context) {
        throw new Error('useImageOverlay must be used within ImageOverlayProvider');
    }
    return context;
};

type Props = { children: ReactNode };

export const ImageOverlayProvider = ({ children }: Props) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const colorScheme = useColorScheme();

    const showImage = (uri: string) => setImageUri(uri);
    const hideImage = () => setImageUri(null);

    return (
        <ImageOverlayContext.Provider value={{ showImage, hideImage }}>
            {children}

            <Modal
                visible={!!imageUri}
                transparent
                animationType="fade"
                statusBarTranslucent
                onRequestClose={hideImage}
            >
                <TouchableWithoutFeedback onPress={hideImage}>
                    <BlurView
                        blurType={colorScheme === 'dark' ? 'dark' : 'light'} blurAmount={40}
                        style={styles.backdrop}>
                        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                    </BlurView>
                </TouchableWithoutFeedback>
            </Modal>
        </ImageOverlayContext.Provider>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 999,
        resizeMode: 'contain',
    },
});
