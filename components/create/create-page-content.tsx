import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../themed-view';

interface Props {
    thumbnail: string | null,
    duration: number | null | undefined;
}

const CreatePageContent = ({ thumbnail, duration }: Props) => {
    return (
        <ThemedView style={styles.main}>

        </ThemedView>
    )
}

export default CreatePageContent

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 16,
    }
})