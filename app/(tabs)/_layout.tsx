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
  const home = segments.length === 1 && segments[0] === '(tabs)';
  const postId = segments[2] === '[postId]';
  const profilePost = segments[1] === '[postId]';
  const isDark = home || postId || profilePost;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? Colors.dark.tint : Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: { backgroundColor: isDark ? Colors.dark.background : Colors[colorScheme ?? 'dark'].background, borderTopColor: isDark ? Colors.dark.card : Colors[colorScheme ?? 'dark'].card, height: Platform.OS === 'android' ? 90 : 82, paddingTop: Platform.OS === 'android' ? 8 : 0, elevation: 0 },
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
            <ThemedView style={[styles.createButton, { backgroundColor: isDark ? Colors.dark.tint : Colors[colorScheme ?? 'dark'].tint }]}>
              <Icon name="add-line" size="24" color={isDark ? Colors.dark.background : Colors[colorScheme ?? 'dark'].background} fallback={null} />
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