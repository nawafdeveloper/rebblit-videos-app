import ExploreItem from '@/components/explore/explore-item'
import ExplorePageHeader from '@/components/explore/explore-page-header'
import ExploreSearchList from '@/components/explore/explore-search-list'
import { ThemedView } from '@/components/themed-view'
import { useIsTablet } from '@/hooks/use-tablet'
import { homeData } from '@/mocks/home-data'
import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

const ExplorePage = () => {
    const [isFocus, setIsFocus] = useState(false);
    const isTablet = useIsTablet();

    return (
        <ThemedView style={styles.main}>
            <ExplorePageHeader
                isFocus={isFocus}
                setIsFocus={setIsFocus}
            />
            <ThemedView style={styles.content}>
                <FlatList
                    data={homeData}
                    keyExtractor={(item) => item.postId}
                    renderItem={({ item }) => (
                        <ExploreItem
                            postUrl={item.postUrl}
                            postId={item.postId}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={isTablet ? 4 : 3}
                    contentContainerStyle={{ gap: 1 }}
                    columnWrapperStyle={{ gap: 1 }}
                />
                {isFocus && (
                    <ThemedView style={styles.searchOverlay}>
                        <ExploreSearchList />
                    </ThemedView>
                )}
            </ThemedView>
        </ThemedView>
    )
}

export default ExplorePage

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    content: {
        flex: 1,
        position: 'relative',
    },
    searchOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
});