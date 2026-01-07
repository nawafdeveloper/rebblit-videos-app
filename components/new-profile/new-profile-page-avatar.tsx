import { Colors } from '@/constants/theme'
import { generateId } from '@/lib/generate-id'
import { useNewProfileStore } from '@/store/new-profile-store'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Alert, Image, Pressable, StyleSheet, useColorScheme } from 'react-native'
import Icon from "react-native-remix-icon"
import { ThemedText } from '../themed-text'
import { ThemedView } from '../themed-view'

const NewProfilePageAvatar = () => {
    const colorScheme = useColorScheme();
    const {
        setAvatar,
        setAvatarName,
        setAvatarType,
        setScreen,
        avatar
    } = useNewProfileStore();

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            setAvatarName(result.assets[0].fileName || generateId(12));
            setAvatarType(result.assets[0].mimeType || 'image/jpeg');
        }
    };

    return (
        <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>
                    Change your avatar
                </ThemedText>
                <ThemedText style={styles.description}>
                    Choose your avatar to enhance your profile
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.content}>
                <ThemedView style={{ position: 'relative' }}>
                    <Pressable onPress={pickImage} style={[styles.avatarContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card, borderColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                        {avatar ? (
                            <Image
                                source={{ uri: avatar }}
                                resizeMode='cover'
                                style={styles.avatarImage}
                            />
                        ) : (
                            <ThemedView style={styles.avatarIconContainer}>
                                <Icon name="user-fill" size="250" color={Colors[colorScheme ?? 'dark'].background} fallback={null} />
                            </ThemedView>
                        )}
                    </Pressable>
                    <ThemedView style={styles.editAvatarButton}>
                        <Icon name="edit-2-line" size="28" color={Colors.dark.text} fallback={null} />
                    </ThemedView>
                </ThemedView>
                <Pressable
                    style={[
                        styles.nextButton,
                        { backgroundColor: Colors[colorScheme ?? 'dark'].text },
                    ]}
                    onPress={() => setScreen('prefered-lang')}
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
                <Pressable onPress={() => setScreen('prefered-lang')}>
                    <ThemedText>Skip this step</ThemedText>
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default NewProfilePageAvatar

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
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24
    },
    avatarContainer: {
        width: 300,
        height: 300,
        borderRadius: 999,
        borderWidth: 1,
        overflow: 'hidden'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    avatarIconContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80
    },
    editAvatarButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 16,
        borderRadius: 99,
        backgroundColor: Colors.dark.blue,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    nextButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 40
    },
    nextButtonText: {
        fontWeight: '600'
    },
})