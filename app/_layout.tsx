import { LoadingProvider } from '@/context/loading-context';
import { NotificationsProvider } from '@/context/notification-context';
import { ToastProvider } from '@/context/toast-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { authClient } from '@/lib/auth-client';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<any>();
  const [isReady, setIsReady] = useState(false);

  const handleGetSession = async () => {
    try {
      const { data: session } = await authClient.getSession();
      setSession(session);
    } catch { }
    finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    handleGetSession();
  }, []);

  useEffect(() => {
    Notifications.setBadgeCountAsync(0);
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <NotificationsProvider>
        <BottomSheetModalProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ToastProvider>
              <LoadingProvider>
                <Stack>
                  <Stack.Protected guard={!session}>
                    <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="signup" options={{ headerShown: false }} />
                  </Stack.Protected>
                  <Stack.Protected guard={session}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'none' }} />
                    <Stack.Screen name="create-post" options={{ presentation: 'fullScreenModal', headerShown: false }} />
                    <Stack.Screen name="image-picker" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                  </Stack.Protected>
                </Stack>
                <StatusBar style="auto" />
              </LoadingProvider>
            </ToastProvider>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </NotificationsProvider>
    </GestureHandlerRootView>
  );
}
