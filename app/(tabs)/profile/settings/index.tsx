import SettingsPageContent from '@/components/settings/settings-page-content'
import SettingsPageHeader from '@/components/settings/settings-page-header'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

const SettingsPage = () => {
    return (
        <ThemedView style={styles.main}>
            <SettingsPageHeader />
            <SettingsPageContent />
        </ThemedView>
    )
}

export default SettingsPage

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})