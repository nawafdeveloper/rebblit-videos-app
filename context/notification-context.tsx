import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Platform } from 'react-native';

type NotificationsContextType = {
    expoPushToken: string | null;
    setExpoPushToken: Dispatch<SetStateAction<string | null>>;

    channels: Notifications.NotificationChannel[];
    setChannels: Dispatch<
        SetStateAction<Notifications.NotificationChannel[]>
    >;

    notification: Notifications.Notification | null;
    setNotification: Dispatch<
        SetStateAction<Notifications.Notification | null>
    >;
};

const NotificationsContext =
    createContext<NotificationsContextType | undefined>(undefined);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

async function registerForPushNotificationsAsync(): Promise<string | null> {
    let token: string | null = null;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (!Device.isDevice) {
        alert('Must use physical device for Push Notifications');
        return null;
    }

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null;
    }

    try {
        const projectId =
            Constants.expoConfig?.extra?.eas?.projectId ??
            Constants.easConfig?.projectId;

        if (!projectId) {
            throw new Error('Project ID not found');
        }

        token = (
            await Notifications.getExpoPushTokenAsync({ projectId })
        ).data;

        console.log('Expo Push Token:', token);
    } catch (error) {
        console.error('Push token error:', error);
    }

    return token;
}

export function NotificationsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [channels, setChannels] = useState<
        Notifications.NotificationChannel[]
    >([]);
    const [notification, setNotification] =
        useState<Notifications.Notification | null>(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then(setExpoPushToken);

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(
                value => setChannels(value ?? [])
            );
        }

        const notificationListener =
            Notifications.addNotificationReceivedListener(
                notification => {
                    setNotification(notification);
                }
            );

        const responseListener =
            Notifications.addNotificationResponseReceivedListener(
                response => {
                    console.log('Notification response:', response);
                }
            );

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);

    return (
        <NotificationsContext.Provider
            value={{
                expoPushToken,
                setExpoPushToken,
                channels,
                setChannels,
                notification,
                setNotification,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error(
            'useNotifications must be used within a NotificationsProvider'
        );
    }

    return context;
}
