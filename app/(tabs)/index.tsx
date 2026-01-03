import HomePageHeader from '@/components/home/home-page-header';
import VideoItem from '@/components/home/video-item';
import { ThemedView } from '@/components/themed-view';
import { homeData } from '@/mocks/home-data';
import { useIsFocused } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, ViewToken } from 'react-native';

const Home = () => {
    const { height } = useWindowDimensions();
    const [focusedIndex, setFocusedIndex] = useState(0);
    const isScreenFocused = useIsFocused();

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0) {
                setFocusedIndex(viewableItems[0].index ?? 0);
            }
        }
    ).current;

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

    return (
        <ThemedView style={styles.main}>
            <HomePageHeader />
            <FlatList
                data={homeData}
                keyExtractor={(item) => item.postId}
                renderItem={({ item, index }) => (
                    <VideoItem
                        key={index}
                        postId={item.postId}
                        postTitle={item.postTitle}
                        postThumbnail={item.postThumbnail}
                        numbOfLikes={item.numbOfLikes}
                        numbOfDisLikes={item.numbOfDisLikes}
                        numberOfComments={item.numberOfComments}
                        username={item.username}
                        userAvatar={item.userAvatar}
                        postUrl={item.postUrl}
                        isFocused={isScreenFocused && index === focusedIndex}
                    />
                )}
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                decelerationRate="fast"
                snapToAlignment="start"
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfigRef.current}
            />
        </ThemedView>
    );
};

export default Home;

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});
