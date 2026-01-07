import { Colors } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import { ThemedView } from './themed-view';

const GlobalLoading = () => {
    const colorScheme = useColorScheme();

    return (
        <ThemedView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <ActivityIndicator
                color={Colors[colorScheme ?? 'dark'].text}
                size={'large'}
            />
        </ThemedView>
    )
}

export default GlobalLoading

const styles = StyleSheet.create({})