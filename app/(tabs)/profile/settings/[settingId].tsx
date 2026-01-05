import SettingIdHeader from '@/components/settings/setting-id-header'
import SettingsYourActivitiesSection from '@/components/settings/settings-your-activities-section'
import { ThemedView } from '@/components/themed-view'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const SettingDetails = () => {
    const { settingId } = useLocalSearchParams<{ settingId: string }>();
    
    return (
        <ThemedView style={styles.main}>
            <SettingIdHeader
                title={settingId}
            />
            <SettingsYourActivitiesSection />
        </ThemedView>
    )
}

export default SettingDetails

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})