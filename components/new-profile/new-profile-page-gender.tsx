import { Colors } from '@/constants/theme';
import { useLoading } from '@/context/loading-context';
import { useToast } from '@/context/toast-context';
import { useAuthSession } from '@/hooks/use-auth-session';
import { useNewProfileStore } from '@/store/new-profile-store';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const NewProfilePageGender = () => {
    const colorScheme = useColorScheme();
    const { gender, setGender, handleCreateProfile } = useNewProfileStore();
    const { setLoading } = useLoading();
    const { showToast } = useToast();
    const { session, isPending, isAuthenticated } = useAuthSession();

    const [isNextDisabled, setIsNextDisables] = useState(true);
    const [selectedGender, setSelectedGender] = useState(gender === 'female' ? 1 : 0);

    const onSubmit = async () => {
        if (isPending) {
            showToast('Please wait...', 'error');
            return;
        }

        if (!session) {
            showToast('Unauthorized', 'error');
            return;
        }

        await handleCreateProfile({
            userId: session.user.id,
            showToast,
            setLoading,
        });
    };

    useEffect(() => {
        if (gender) {
            setIsNextDisables(false);
        } else {
            setIsNextDisables(true);
        }
    }, [gender]);

    return (
        <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.title}>
                Select your gender
            </ThemedText>
            <ThemedView style={styles.gendersContainer}>
                <Pressable onPress={() => { setSelectedGender(0); setGender('male') }} style={[styles.genderButton, {
                    borderColor: selectedGender === 0 ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].lightCard,
                    backgroundColor: selectedGender === 0 ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].lightCard
                }]}>
                    <ThemedText style={[styles.genderButtonText, { color: selectedGender === 0 ? Colors.dark.text : 'gray' }]}>Male</ThemedText>
                </Pressable>
                <Pressable onPress={() => { setSelectedGender(1); setGender('female') }} style={[styles.genderButton, {
                    borderColor: selectedGender === 1 ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].lightCard,
                    backgroundColor: selectedGender === 1 ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].lightCard
                }]}>
                    <ThemedText style={[styles.genderButtonText, { color: selectedGender === 1 ? Colors.dark.text : 'gray' }]}>Female</ThemedText>
                </Pressable>
            </ThemedView>
            <Pressable
                style={[
                    styles.nextButton,
                    {
                        backgroundColor: Colors[colorScheme ?? 'dark'].text,
                        opacity: (isNextDisabled || isPending) ? 0.3 : 1
                    },
                ]}
                disabled={isNextDisabled || isPending}
                onPress={onSubmit}
            >
                <ThemedText
                    style={[
                        styles.nextButtonText,
                        { color: Colors[colorScheme ?? 'dark'].background },
                    ]}
                >
                    {isPending ? 'Loading...' : 'Finish your account'}
                </ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default NewProfilePageGender

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '800',
        fontSize: 44,
        lineHeight: 58,
        padding: 16
    },
    gendersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16
    },
    genderButton: {
        borderWidth: 2,
        borderRadius: 14,
        borderCurve: 'continuous',
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    genderButtonText: {
        fontWeight: '700'
    },
    nextButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 32
    },
    nextButtonText: {
        fontWeight: '600'
    },
})