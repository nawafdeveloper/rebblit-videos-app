import { Colors } from '@/constants/theme';
import { homeData } from '@/mocks/home-data';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import Icon from "react-native-remix-icon";
import ProfilePageContentHeader from './profile-page-content-header';
import ProfilePageItem from './profile-page-item';

const HEADER_HEIGHT = 350;

const ProfilePageContent = () => {
    const colorScheme = useColorScheme();

    return (
        <Tabs.Container
            renderHeader={ProfilePageContentHeader}
            headerContainerStyle={{
                elevation: 0,
                shadowOpacity: 0,
            }}
            containerStyle={{
                elevation: 0,
                shadowOpacity: 0,
            }}
            renderTabBar={(props) => (
                <MaterialTabBar
                    {...props}
                    activeColor={Colors[colorScheme ?? 'dark'].text}
                    inactiveColor={Colors[colorScheme ?? 'dark'].tabIconDefault}
                    style={{
                        backgroundColor: Colors[colorScheme ?? 'dark'].background,
                        elevation: 0,
                        shadowOpacity: 0,
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors[colorScheme ?? 'dark'].card
                    }}
                    contentContainerStyle={{
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    indicatorStyle={{ backgroundColor: Colors[colorScheme ?? 'dark'].text }}
                />
            )}
        >
            <Tabs.Tab
                name="post"
                label={() => (
                    <Icon name="list-radio" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                )}
            >
                <Tabs.FlatList
                    data={homeData}
                    renderItem={({ item, index }) => (
                        <ProfilePageItem
                            key={index}
                            postUrl={item.postUrl}
                            postId={item.postId}
                        />
                    )}
                    keyExtractor={(item) => item.postId}
                    numColumns={3}
                    contentContainerStyle={{ gap: 1 }}
                    columnWrapperStyle={{ gap: 1 }}
                />
            </Tabs.Tab>
            <Tabs.Tab
                name="save"
                label={() => (
                    <Icon name="bookmark-line" size="24" color={Colors[colorScheme ?? 'dark'].text} fallback={null} />
                )}
            >
                <Tabs.FlatList
                    data={homeData}
                    renderItem={({ item, index }) => (
                        <ProfilePageItem
                            key={index}
                            postUrl={item.postUrl}
                            postId={item.postId}
                        />
                    )}
                    keyExtractor={(item) => item.postId}
                    numColumns={3}
                    contentContainerStyle={{ gap: 1 }}
                    columnWrapperStyle={{ gap: 1 }}
                />
            </Tabs.Tab>
        </Tabs.Container>
    )
}

export default ProfilePageContent

const styles = StyleSheet.create({})