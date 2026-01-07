import { Colors } from '@/constants/theme'
import { useNewProfileStore } from '@/store/new-profile-store'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import { Platform, Pressable, StyleSheet, useColorScheme } from 'react-native'
import Icon from "react-native-remix-icon"
import { ThemedText } from '../themed-text'
import { ThemedView } from '../themed-view'

const NewProfilePageBirthday = () => {
    const colorScheme = useColorScheme()
    const { birthday, setBirthday, setScreen } = useNewProfileStore();

    const [showPicker, setShowPicker] = useState(false)
    const [isNextDisabled, setIsNextDisables] = useState(true);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false)
        }

        if (selectedDate) {
            setBirthday(selectedDate)
        }
    }

    const formattedBirthday = birthday
        ? birthday.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Select your birthday'

    useEffect(() => {
        if (birthday) {
            setIsNextDisables(false);
        } else {
            setIsNextDisables(true);
        }
    }, [birthday]);

    return (
        <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.titleContent}>
                <Icon name="cake-2-line" size="32" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.title}>
                        What's your birthday?
                    </ThemedText>
                    <ThemedText style={styles.description}>
                        Your birthday won't be shown publicly.
                    </ThemedText>
                </ThemedView>
            </ThemedView>

            <Pressable
                style={[
                    styles.inputContainer,
                    { borderBottomColor: Colors[colorScheme ?? 'dark'].lightCard },
                ]}
                onPress={() => setShowPicker(true)}
            >
                <ThemedText style={{ color: birthday ? Colors[colorScheme ?? 'dark'].text : 'gray' }}>{formattedBirthday}</ThemedText>
            </Pressable>
            <Pressable
                style={[
                    styles.nextButton,
                    { backgroundColor: Colors[colorScheme ?? 'dark'].text, opacity: isNextDisabled ? 0.3 : 1 },
                ]}
                disabled={isNextDisabled}
                onPress={() => setScreen('display-name')}
            >
                <ThemedText
                    style={[
                        styles.nextButtonText,
                        { color: Colors[colorScheme ?? 'dark'].background },
                    ]}
                >
                    Next step
                </ThemedText>
            </Pressable>
            <ThemedView style={styles.bottomContainer}>
                {showPicker && (
                    <DateTimePicker
                        value={birthday ?? new Date()}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                        maximumDate={new Date()}
                        accentColor={Colors[colorScheme ?? 'dark'].text}
                    />
                )}
            </ThemedView>
        </ThemedView>
    )
}

export default NewProfilePageBirthday


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    titleContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 20
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8
    },
    title: {
        fontWeight: '700',
        lineHeight: 16
    },
    description: {
        fontSize: 14,
        lineHeight: 14
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: Platform.OS === 'android' ? 8 : 18,
        borderBottomWidth: 1
    },
    nextButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    nextButtonText: {
        fontWeight: '600'
    },
    bottomContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
})