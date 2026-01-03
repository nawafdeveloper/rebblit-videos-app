import ExploreItem from '@/components/explore/explore-item'
import ExplorePageHeader from '@/components/explore/explore-page-header'
import { ThemedView } from '@/components/themed-view'
import { homeData } from '@/mocks/home-data'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

const ExplorePage = () => {
    return (
        <ThemedView style={styles.main}>
            <ExplorePageHeader />
            <FlatList
                data={homeData}
                keyExtractor={(item) => item.postId}
                renderItem={({ item, index }) => (
                    <ExploreItem
                        key={index}
                        postUrl={item.postUrl}
                        postId={item.postId}
                    />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 82 }}
            />
        </ThemedView>
    )
}

export default ExplorePage

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})