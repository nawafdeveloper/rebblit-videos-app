import { Colors } from '@/constants/theme';
import React from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../themed-view';

interface Props {
    isFocus: boolean;
    setIsFocus: (value: boolean) => void;
}

const ExplorePageHeader = ({ isFocus, setIsFocus }: Props) => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top, borderBottomColor: Colors[colorScheme ?? 'dark'].card }]}>
            <ThemedView style={[styles.inputConteiner, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                <Icon name="search-line" size="18" color={Colors[colorScheme ?? 'dark'].tabIconDefault} fallback={null} />
                <TextInput
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    placeholder='Search for content'
                    style={{ color: Colors[colorScheme ?? 'dark'].text, flex: 1 }}
                    placeholderTextColor={Colors[colorScheme ?? 'dark'].tabIconDefault}
                />
            </ThemedView>
            {isFocus && (
                <Pressable onPress={handleDismissKeyboard}>
                    <Icon name="arrow-right-s-line" size="22" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
            )}
        </ThemedView>
    )
}

export default ExplorePageHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1
    },
    inputConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 18,
        paddingVertical: Platform.OS === 'android' ? 3 : 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        flex: 1
    }
})