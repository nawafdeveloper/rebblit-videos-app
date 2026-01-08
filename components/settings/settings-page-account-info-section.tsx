import { Colors } from '@/constants/theme';
import { authClient } from '@/lib/auth-client';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageAccountInformationSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { data: session, isPending } = authClient.useSession();

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [email, setEmail] = useState(session?.user.email);

    const handleShowDatePicker = () => setIsDatePickerVisible(prev => !prev);

    if (isPending) {
        return <GlobalLoading />
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Email address</ThemedText>
                    <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={'gray'}
                            style={styles.input}
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Phone number</ThemedText>
                    <ThemedView style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard }]}>
                        <TextInput
                            value='559944487'
                            placeholderTextColor={'gray'}
                            style={styles.input}
                            keyboardType='numeric'
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Birth day</ThemedText>
                    <Pressable onPress={handleShowDatePicker} style={[styles.inputContainer, { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard, paddingVertical: 20, width: '100%' }]}>
                        <ThemedText style={styles.birthdayText}>05-June-1989</ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>
            {isDatePickerVisible && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'android' ? 'calendar' : 'default'}
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            console.log(selectedDate);
                        }
                        if (event.type === 'dismissed') {
                            setIsDatePickerVisible(false);
                        }
                    }}
                />
            )}
        </ScrollView>
    )
}

export default SettingsPageAccountInformationSection

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 16,
        gap: 24
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 6
    },
    label: {
        fontSize: 14
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: Platform.OS === 'android' ? 8 : 18,
        borderBottomWidth: 1
    },
    input: {
        flex: 1,
        color: 'gray'
    },
    birthdayText: {
        fontSize: 14,
        color: 'gray'
    }
})