import GlobalLoading from '@/components/global-loading'
import NewProfilePageAvatar from '@/components/new-profile/new-profile-page-avatar'
import NewProfilePageBiography from '@/components/new-profile/new-profile-page-biography'
import NewProfilePageBirthday from '@/components/new-profile/new-profile-page-birthday'
import NewProfilePageDisplayName from '@/components/new-profile/new-profile-page-display-name'
import NewProfilePageGender from '@/components/new-profile/new-profile-page-gender'
import NewProfilePageHeader from '@/components/new-profile/new-profile-page-header'
import NewProfilePagePreferedLang from '@/components/new-profile/new-profile-page-prefered-lang'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { authClient } from '@/lib/auth-client'
import { useNewProfileStore } from '@/store/new-profile-store'
import React from 'react'
import { StyleSheet } from 'react-native'

const NewProfilePage = () => {
    const { screen, setScreen } = useNewProfileStore();
    const { data: session, isPending } = authClient.useSession();

    const getScreen = () => {
        switch (screen) {
            case 'birthday':
                return <NewProfilePageBirthday />
            case 'display-name':
                return <NewProfilePageDisplayName />
            case 'biography':
                return <NewProfilePageBiography />
            case 'avatar':
                return <NewProfilePageAvatar />
            case 'gender':
                return <NewProfilePageGender />
            case 'prefered-lang':
                return <NewProfilePagePreferedLang />
            default: return null
        }
    };

    if (isPending) {
        return <GlobalLoading />
    }

    if (!session) {
        return (
            <ThemedView style={styles.main}>
                <ThemedView style={styles.loadingContainer}>
                    <ThemedText>You need to be logged in to access this page</ThemedText>
                </ThemedView>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.main}>
            <NewProfilePageHeader
                screen={screen}
                setScreen={setScreen}
            />
            {getScreen()}
        </ThemedView>
    )
}

export default NewProfilePage

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    }
})