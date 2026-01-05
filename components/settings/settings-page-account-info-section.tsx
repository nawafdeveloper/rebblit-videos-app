import { Colors } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageAccountInformationSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const handleShowDatePicker = () => setIsDatePickerVisible(prev => !prev);

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Email address</ThemedText>
                    <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                        <Icon name="edit-2-line" size="20" color='gray' fallback={null} />
                        <TextInput
                            value='nawaf.alhasosah@gmail.com'
                            placeholderTextColor={'gray'}
                            style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Phone number</ThemedText>
                    <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                        <Icon name="edit-2-line" size="20" color='gray' fallback={null} />
                        <TextInput
                            value='559944487'
                            placeholderTextColor={'gray'}
                            style={[styles.input, { color: Colors[colorScheme ?? 'dark'].text }]}
                            keyboardType='numeric'
                        />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Birth day</ThemedText>
                    <ThemedView style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card, paddingVertical: 8, width: '100%' }]}>
                        <Pressable onPress={handleShowDatePicker} style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                            <ThemedText style={styles.birthdayText}>05-June-1989</ThemedText>
                        </Pressable>
                    </ThemedView>
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
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'android' ? 2 : 8,
        borderRadius: 99,
        borderCurve: 'continuous',
    },
    input: {
        flex: 1
    },
    birthdayText: {
        fontSize: 14
    }
})