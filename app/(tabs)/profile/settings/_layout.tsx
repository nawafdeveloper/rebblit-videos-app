import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const SettingsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='[settingId]' options={{ headerShown: false }} />
        </Stack>
    )
}

export default SettingsLayout

const styles = StyleSheet.create({})