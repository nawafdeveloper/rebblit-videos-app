import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginPage = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={styles.main}>

        </ThemedView>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})