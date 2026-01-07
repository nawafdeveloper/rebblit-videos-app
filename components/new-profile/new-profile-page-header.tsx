import { Colors } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

type Screen =
    | 'birthday'
    | 'display-name'
    | 'avatar'
    | 'biography'
    | 'gender'
    | 'prefered-lang';

interface Props {
    screen: Screen;
    setScreen: (screen: Screen) => void;
}

const NewProfilePageHeader = ({ screen, setScreen }: Props) => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    const isFirstScreen = screen === 'birthday';

    const handleGoBack = () => {
        switch (screen) {
            case 'display-name':
                return setScreen('birthday')
            case 'biography':
                return setScreen('display-name')
            case 'avatar':
                return setScreen('biography')
            case 'prefered-lang':
                return setScreen('avatar')
            case 'gender':
                return setScreen('prefered-lang')
            default: null
        }
    };

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <ThemedView style={styles.leftContainer}>
                {!isFirstScreen && (
                    <Pressable onPress={handleGoBack}>
                        <Icon name="arrow-left-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                    </Pressable>
                )}
                <ThemedText style={styles.title}>Complete your profile</ThemedText>
            </ThemedView>
            <Pressable style={[styles.signoutButtonContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].text }]}>
                <ThemedText style={[styles.signoutButtonText, { color: Colors[colorScheme ?? 'dark'].background }]}>Signout</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default NewProfilePageHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontWeight: '600',
        fontSize: 18
    },
    signoutButtonContainer: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 99,
        borderCurve: 'continuous',
    },
    signoutButtonText: {
        fontWeight: '600',
        fontSize: 14
    }
})