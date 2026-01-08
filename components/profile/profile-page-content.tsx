import { Colors } from '@/constants/theme';
import { homeData } from '@/mocks/home-data';
import React, { useCallback } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import ProfilePageContentHeader from './profile-page-content-header';
import ProfilePageItem from './profile-page-item';

const ProfilePageContent = () => {
    const colorScheme = useColorScheme();

    const renderHeader = useCallback(
        () => <ProfilePageContentHeader />,
        []
    );

    return (
        <Tabs.Container
            renderHeader={renderHeader}
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
                label={'Posts'}
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
                    removeClippedSubviews={true}
                    windowSize={7}
                    initialNumToRender={12}
                    maxToRenderPerBatch={12}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ gap: 1 }}
                    columnWrapperStyle={{ gap: 1 }}
                />
            </Tabs.Tab>
            <Tabs.Tab
                name="save"
                label={'Saves'}
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
                    removeClippedSubviews={true}
                    windowSize={7}
                    initialNumToRender={12}
                    maxToRenderPerBatch={12}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ gap: 1 }}
                    columnWrapperStyle={{ gap: 1 }}
                />
            </Tabs.Tab>
        </Tabs.Container>
    )
}

export default ProfilePageContent

const styles = StyleSheet.create({})