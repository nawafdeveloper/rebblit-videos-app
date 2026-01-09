import SettingIdHeader from '@/components/settings/setting-id-header'
import SettingPageEmailVerificationOtp from '@/components/settings/setting-page-email-verification-otp'
import SettingsPageAccountInformationSection from '@/components/settings/settings-page-account-info-section'
import SettingsPageAccountSection from '@/components/settings/settings-page-account-section'
import SettingsPageBlockedUsersSection from '@/components/settings/settings-page-blocked-users-section'
import SettingsPageDisplaySection from '@/components/settings/settings-page-display-section'
import SettingsPageEditProfileSection from '@/components/settings/settings-page-edit-profile-section'
import SettingsPageHelpCenterSection from '@/components/settings/settings-page-help-center-section'
import SettingsPageLanguageSection from '@/components/settings/settings-page-language-section'
import SettingsPageNotificationsSection from '@/components/settings/settings-page-notifications-section'
import SettingsPagePasswordSection from '@/components/settings/settings-page-password-section'
import SettingsPrivacySection from '@/components/settings/settings-page-privacy-section'
import SettingsPageTermsSection from '@/components/settings/settings-page-terms-section'
import SettingsPlaybackSection from '@/components/settings/settings-playback-section'
import SettingsYourActivitiesSection from '@/components/settings/settings-your-activities-section'
import { ThemedView } from '@/components/themed-view'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const SettingDetails = () => {
    const { settingId } = useLocalSearchParams<{ settingId: string }>();

    const renderPage = () => {
        switch (settingId) {
            case 'Account settings':
                return <SettingsPageAccountSection />;
            case 'Privacy settings':
                return <SettingsPrivacySection />;
            case 'Blocked users':
                return <SettingsPageBlockedUsersSection />;
            case 'Your activities':
                return <SettingsYourActivitiesSection />;
            case 'Notifications':
                return <SettingsPageNotificationsSection />;
            case 'Playback':
                return <SettingsPlaybackSection />;
            case 'Language':
                return <SettingsPageLanguageSection />;
            case 'Display':
                return <SettingsPageDisplaySection />;
            case 'Help center':
                return <SettingsPageHelpCenterSection />;
            case 'Terms & policy':
                return <SettingsPageTermsSection />;
            case 'Account information':
                return <SettingsPageAccountInformationSection />;
            case 'Password':
                return <SettingsPagePasswordSection />;
            case 'Edit profile':
                return <SettingsPageEditProfileSection />;
            case 'Confirm Email':
                return <SettingPageEmailVerificationOtp />
            default: null;
        }
    };

    return (
        <ThemedView style={styles.main}>
            <SettingIdHeader
                title={settingId}
            />
            {renderPage()}
        </ThemedView>
    )
}

export default SettingDetails

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})