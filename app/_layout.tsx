import GlobalLoading from '@/components/global-loading';
import { Colors } from '@/constants/theme';
import { ImageOverlayProvider } from '@/context/avatar-preview-context';
import { LoadingProvider } from '@/context/loading-context';
import { NotificationsProvider } from '@/context/notification-context';
import { ToastProvider } from '@/context/toast-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { authClient } from '@/lib/auth-client';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    Notifications.setBadgeCountAsync(0);
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!isPending) {
      SplashScreen.hide();
    }
  }, [isPending]);

  if (isPending) {
    return <GlobalLoading />;
  }

  return (
    <GestureHandlerRootView>
      <NotificationsProvider>
        <BottomSheetModalProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ToastProvider>
              <LoadingProvider>
                <QueryClientProvider client={queryClient}>
                  <ImageOverlayProvider>
                    <Stack screenOptions={{
                      contentStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].background }
                    }}>
                      <Stack.Protected guard={!session}>
                        <Stack.Screen name="index" options={{ headerShown: false, animation: 'none', gestureEnabled: false }} />
                        <Stack.Screen name="login" options={{ headerShown: false }} />
                        <Stack.Screen name="signup" options={{ headerShown: false }} />
                        <Stack.Screen name="request-otp-reset-password" options={{ headerShown: false }} />
                        <Stack.Screen name="two-factor-otp" options={{ headerShown: false, animation: 'none' }} />
                      </Stack.Protected>
                      <Stack.Protected guard={session?.session.token.length !== 0}>
                        <Stack.Protected guard={!session?.user.hasProfile}>
                          <Stack.Screen name="new-profile" options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} />
                        </Stack.Protected>
                        <Stack.Protected guard={session?.user.hasProfile === true}>
                          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'none', gestureEnabled: false }} />
                          <Stack.Screen name="create-post" options={{ presentation: 'fullScreenModal', headerShown: false }} />
                          <Stack.Screen name="image-picker" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                        </Stack.Protected>
                      </Stack.Protected>
                    </Stack>
                  </ImageOverlayProvider>
                </QueryClientProvider>
                <StatusBar style="auto" />
              </LoadingProvider>
            </ToastProvider>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </NotificationsProvider>
    </GestureHandlerRootView>
  );
}
