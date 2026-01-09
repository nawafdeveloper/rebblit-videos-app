import { Colors } from '@/constants/theme';
import { useToast } from '@/context/toast-context';
import { useSendEmailOTP } from '@/hooks/use-confirm-email';
import { authClient } from '@/lib/auth-client';
import { useUserProfileStore } from '@/store/user-profile-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';
import Icon from "react-native-remix-icon";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalLoading from '../global-loading';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const SettingsPageAccountInformationSection = () => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { showToast } = useToast();
    const { data: session } = authClient.useSession();
    const { handleSendOtp } = useSendEmailOTP()

    const fetchProfile = useUserProfileStore((s) => s.fetchProfile);
    const profile = useUserProfileStore((s) => s.profile);
    const isLoading = useUserProfileStore((s) => s.isLoading);

    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    useEffect(() => {
        fetchProfile({ showToast });
    }, []);

    useEffect(() => {
        if (session?.user.email) {
            setEmail(session.user.email);
        }
    }, [session?.user.email]);

    useEffect(() => {
        if (profile?.birthday) {
            setBirthday(new Date(profile.birthday));
        }
    }, [profile?.birthday]);

    useEffect(() => {
        if (profile?.gender) {
            setGender(profile.gender);
        }
    }, [profile?.birthday]);

    const formattedBirthday = birthday
        ? birthday.toLocaleDateString()
        : isLoading
            ? ' '
            : 'Select your birthday';

    if (isLoading) {
        return <GlobalLoading />
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ThemedView style={[styles.main, { paddingBottom: insets.bottom }]}>
                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Email address</ThemedText>
                    <ThemedView
                        style={[
                            styles.inputContainer,
                            {
                                borderBottomColor:
                                    Colors[colorScheme ?? 'dark'].lightCard,
                            },
                        ]}
                    >
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                        />
                    </ThemedView>
                    {!session?.user.emailVerified && (
                        <ThemedView style={styles.emailConfirmationContainer}>
                            <ThemedView style={styles.confirmEmailContainer}>
                                <Icon name='information-line' size="20" color='gray' fallback={null} />
                                <ThemedText style={styles.confirmEmailText}>
                                    Your email address is not confirmed yet, please confirm your email address for security measures.
                                </ThemedText>
                            </ThemedView>
                            <Pressable onPress={() => handleSendOtp(session?.user.email || '')} style={[styles.confirmEmailButton, { backgroundColor: Colors[colorScheme ?? 'dark'].card }]}>
                                <ThemedText style={styles.confirmEmailButtonText}>Confirm now</ThemedText>
                            </Pressable>
                        </ThemedView>
                    )}
                </ThemedView>

                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Gender</ThemedText>
                    <ThemedView style={styles.genderContainer}>
                        <Pressable
                            onPress={() => setGender('male')}
                            style={[
                                styles.inputContainer,
                                {
                                    borderBottomColor:
                                        Colors[colorScheme ?? 'dark'].lightCard,
                                    paddingVertical: 20,
                                    flex: 1,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    borderWidth: 3,
                                    borderColor: gender === 'male' ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].card,
                                    borderRadius: 99,
                                    padding: 2,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: gender === 'male' ? Colors.dark.blue : 'transparent',
                                        borderRadius: 99,
                                        width: 12,
                                        height: 12,
                                    }}
                                />
                            </View>
                            <ThemedText style={styles.birthdayText}>
                                Male
                            </ThemedText>
                        </Pressable>
                        <Pressable
                            onPress={() => setGender('female')}
                            style={[
                                styles.inputContainer,
                                {
                                    borderBottomColor:
                                        Colors[colorScheme ?? 'dark'].lightCard,
                                    paddingVertical: 20,
                                    flex: 1,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    borderWidth: 3,
                                    borderColor: gender === 'female' ? Colors.dark.blue : Colors[colorScheme ?? 'dark'].card,
                                    borderRadius: 99,
                                    padding: 2,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: gender === 'female' ? Colors.dark.blue : 'transparent',
                                        borderRadius: 99,
                                        width: 12,
                                        height: 12,
                                    }}
                                />
                            </View>
                            <ThemedText style={styles.birthdayText}>
                                Female
                            </ThemedText>
                        </Pressable>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.contentContainer}>
                    <ThemedText style={styles.label}>Birth day</ThemedText>
                    <Pressable
                        onPress={() => setIsDatePickerVisible(true)}
                        style={[
                            styles.inputContainer,
                            {
                                borderBottomColor:
                                    Colors[colorScheme ?? 'dark'].lightCard,
                                paddingVertical: 20,
                                width: '100%',
                            },
                        ]}
                    >
                        <ThemedText style={styles.birthdayText}>
                            {formattedBirthday}
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>

            {isDatePickerVisible && (
                <DateTimePicker
                    value={birthday ?? new Date()}
                    mode="date"
                    display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                    onChange={(event, date) => {
                        if (Platform.OS === 'android') {
                            setIsDatePickerVisible(false);
                        }
                        if (date) {
                            setBirthday(date);
                        }
                    }}
                />
            )}
            <Pressable
                style={[
                    styles.saveButton,
                    { backgroundColor: Colors[colorScheme ?? 'dark'].text },
                ]}
            >
                <ThemedText
                    style={[
                        styles.saveButtonText,
                        { color: Colors[colorScheme ?? 'dark'].background },
                    ]}
                >
                    Save changes
                </ThemedText>
            </Pressable>
        </ScrollView>
    );
};

export default SettingsPageAccountInformationSection;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 6,
    },
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    label: {
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: Platform.OS === 'android' ? 8 : 18,
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,
        color: 'gray',
    },
    birthdayText: {
        fontSize: 14,
        color: 'gray',
    },
    emailConfirmationContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8
    },
    confirmEmailContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10
    },
    confirmEmailText: {
        fontSize: 12,
        color: 'gray',
        minWidth: 0,
        lineHeight: 14,
        maxWidth: 350
    },
    confirmEmailButton: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 7,
        borderCurve: 'continuous',
    },
    confirmEmailButtonText: {
        fontWeight: '600',
        fontSize: 14
    },
    saveButton: {
        paddingVertical: 12,
        borderRadius: 99,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 16
    },
    saveButtonText: {
        fontWeight: '600'
    },
});
