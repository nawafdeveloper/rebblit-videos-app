import { Colors } from '@/constants/theme'
import { useNewProfileStore } from '@/store/new-profile-store'
import React, { useEffect, useState } from 'react'
import { Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native'
import { ThemedText } from '../themed-text'
import { ThemedView } from '../themed-view'

const NewProfilePageDisplayName = () => { 
    const colorScheme = useColorScheme();
    const { displayName, setDisplayName, setScreen } = useNewProfileStore();

    const [isNextDisabled, setIsNextDisables] = useState(true);

    useEffect(() => {
        if (displayName) {
            setIsNextDisables(false);
        } else {
            setIsNextDisables(true);
        }
    }, [displayName]);

    return (
        <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>
                    Edit your display name
                </ThemedText>
                <ThemedText style={styles.description}>
                    Your can set your prefered display name to the public
                </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                <TextInput
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholderTextColor={'gray'}
                    placeholder='Display name'
                    autoCapitalize='none'
                    style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                />
            </ThemedView>
            <Pressable
                style={[
                    styles.nextButton,
                    { backgroundColor: Colors[colorScheme ?? 'dark'].text, opacity: isNextDisabled ? 0.3 : 1 },
                ]}
                disabled={isNextDisabled}
                onPress={() => setScreen('biography')}
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
        </ThemedView>
    )
}

export default NewProfilePageDisplayName

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
        lineHeight: 16
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
        flex: 1
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