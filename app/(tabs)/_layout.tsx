import { router, Tabs, useSegments } from 'expo-router';
import React from 'react';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Platform, StyleSheet } from 'react-native';
import Icon from "react-native-remix-icon";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const isHome = segments.length === 1 && segments[0] === '(tabs)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isHome ? Colors.dark.tint : Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: isHome ? Colors.dark.background : Colors[colorScheme ?? 'dark'].background, borderTopColor: isHome ? Colors.dark.card : Colors[colorScheme ?? 'dark'].card, height: Platform.OS === 'android' ? 90 : 82, paddingTop: Platform.OS === 'android' ? 8 : 0 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Icon name={focused ? "home-4-fill" : "home-4-line"} size="24" color={color} fallback={null} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => <Icon name={focused ? "global-fill" : "global-line"} size="24" color={color} fallback={null} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: () => (
            <ThemedView style={[styles.createButton, { backgroundColor: isHome ? Colors.dark.tint : Colors[colorScheme ?? 'dark'].tint }]}>
              <Icon name="add-line" size="24" color={isHome ? Colors.dark.background : Colors[colorScheme ?? 'dark'].background} fallback={null} />
            </ThemedView>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push('/image-picker')
          }
        }}
      />
      <Tabs.Screen
        name="following"
        options={{
          title: 'Following',
          tabBarIcon: ({ color, focused }) => <Icon name={focused ? "group-2-fill" : "group-2-line"} size="24" color={color} fallback={null} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <Icon name={focused ? "account-circle-fill" : "account-circle-line"} size="24" color={color} fallback={null} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButton: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 24,
    borderCurve: 'continuous',
    marginTop: 14
  }
});