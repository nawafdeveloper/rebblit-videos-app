import ProfilePageContent from '@/components/profile/profile-page-content'
import ProfilePageHeader from '@/components/profile/profile-page-header'
import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { StyleSheet } from 'react-native'

const ProfilePage = () => {
    return (
        <ThemedView style={styles.main}>
            <ProfilePageHeader />
            <ProfilePageContent />
        </ThemedView>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})