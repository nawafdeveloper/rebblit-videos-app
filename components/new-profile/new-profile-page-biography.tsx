import { Colors } from '@/constants/theme';
import { useNewProfileStore } from '@/store/new-profile-store';
import React from 'react';
import { Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const NewProfilePageBiography = () => {
    const colorScheme = useColorScheme();
    const { biography, setBiography, setScreen } = useNewProfileStore();

    return (
        <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>
                    Add your biography
                </ThemedText>
                <ThemedText style={styles.description}>
                    Your can set your biography to better your profile
                </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                <TextInput
                    value={biography}
                    onChangeText={setBiography}
                    placeholderTextColor={'gray'}
                    placeholder='Hello there, I am using Rebblit for fun.'
                    multiline
                    style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                />
            </ThemedView>
            <Pressable
                style={[
                    styles.nextButton,
                    { backgroundColor: Colors[colorScheme ?? 'dark'].text },
                ]}
                onPress={() => setScreen('avatar')}
            >
                <ThemedText
                    style={[
                        styles.nextButtonText,
                        { color: Colors[colorScheme ?? 'dark'].background },
                    ]}
                >
                    Next step
                </ThemedText>
            </Pressable>
            <Pressable onPress={() => setScreen('avatar')}>
                <ThemedText style={{ textAlign: 'center' }}>Skip this step</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default NewProfilePageBiography

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8
    },
    title: {
        fontWeight: '700',
        lineHeight: 18,
        minWidth: 0,
        width: '100%'
    },
    description: {
        fontSize: 14,
        lineHeight: 14,
        maxWidth: 300
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: Platform.OS === 'android' ? 8 : 18,
        borderBottomWidth: 1
    },
    input: {
        flex: 1,
        minHeight: 120,
        textAlignVertical: 'top'
    },
    nextButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    nextButtonText: {
        fontWeight: '600'
    },
})