import { Tabs } from 'expo-router';
import React from 'react';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import Icon from "react-native-remix-icon";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 999 },
        tabBarBackground: () => (
          <BlurView intensity={50} tint="default" style={StyleSheet.absoluteFill} />
        )
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
            <ThemedView style={[styles.createButton, { backgroundColor: Colors[colorScheme ?? 'dark'].tint }]}>
              <Icon name="add-line" size="24" color={Colors[colorScheme ?? 'dark'].background} fallback={null} />
            </ThemedView>
          ),
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