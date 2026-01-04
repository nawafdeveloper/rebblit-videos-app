import ImagePickerAssets from '@/components/image-picker/image-picker-assets'
import ImagePickerHeader from '@/components/image-picker/image-picker-header'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

const ImagePickerPage = () => {
    return (
        <ThemedView style={styles.main}>
            <ImagePickerHeader />
            <ImagePickerAssets />
        </ThemedView>
    )
}

export default ImagePickerPage

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})