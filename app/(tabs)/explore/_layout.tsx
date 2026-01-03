import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const ExploreLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='[postId]' options={{ headerShown: false }} />
        </Stack>
    )
}

export default ExploreLayout

const styles = StyleSheet.create({})