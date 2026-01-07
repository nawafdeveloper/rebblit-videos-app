import { Colors } from '@/constants/theme';
import { useLogout } from '@/hooks/use-logout';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ProfilePageHeader = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { handleLogout } = useLogout();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
            />
        ),
        []
    );

    return (
        <ThemedView style={[styles.main, { paddingTop: insets.top }]}>
            <ThemedView style={styles.rightSideContainer}>
                <Pressable onPress={handlePresentModalPress}>
                    <Icon name="more-2-fill" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
                <Pressable onPress={() => router.push('/(tabs)/profile/settings')}>
                    <Icon name="settings-5-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                </Pressable>
            </ThemedView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                backdropComponent={renderBackdrop}
                handleStyle={{ backgroundColor: Colors[colorScheme ?? 'dark'].card, borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 0, borderCurve: 'continuous' }}
                backgroundStyle={{ backgroundColor: Colors[colorScheme ?? 'dark'].card, borderTopRightRadius: 24, borderTopLeftRadius: 24 }}
                handleIndicatorStyle={{ backgroundColor: 'gray', width: 50 }}
            >
                <BottomSheetView style={[styles.sheetContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card, paddingBottom: insets.bottom * 2 }]}>
                    <ThemedView style={styles.buttonsContainer}>
                        <Pressable style={styles.sheetButton}>
                            <Icon name="share-2-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                            <ThemedText style={styles.sheetButtonText}>Share profile</ThemedText>
                        </Pressable>
                        <Pressable style={styles.sheetButton}>
                            <Icon name="edit-box-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                            <ThemedText style={styles.sheetButtonText}>Edit profile</ThemedText>
                        </Pressable>
                        <Pressable style={styles.sheetButton}>
                            <Icon name="questionnaire-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                            <ThemedText style={styles.sheetButtonText}>Help center</ThemedText>
                        </Pressable>
                        <Pressable onPress={handleLogout} style={[styles.sheetButton, { borderBottomWidth: 0 }]}>
                            <Icon name="logout-box-r-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                            <ThemedText style={styles.sheetButtonText}>Logout account</ThemedText>
                        </Pressable>
                    </ThemedView>
                </BottomSheetView>
            </BottomSheetModal>
        </ThemedView>
    )
}

export default ProfilePageHeader

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 16,
        zIndex: 999
    },
    title: {
        fontWeight: '600',
        fontSize: 24
    },
    rightSideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'transparent'
    },
    sheetContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    buttonsContainer: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 14,
        borderCurve: 'continuous',
        gap: 10,
        backgroundColor: 'transparent'
    },
    sheetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 7,
    },
    sheetButtonText: {
        fontSize: 16,
        fontWeight: '600'
    }
})