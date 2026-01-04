import PostIdPageHeader from '@/components/postId/post-id-page-header'
import ProfileVideoFull from '@/components/profile/profile-video-full'
import { ThemedView } from '@/components/themed-view'
import { homeData } from '@/mocks/home-data'
import { useIsFocused } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const PostId = () => {
    const { postId } = useLocalSearchParams<{ postId: string }>();
    const isScreenFocused = useIsFocused();

    const postData = homeData.find((post) => post.postId === postId);

    return (
        <ThemedView style={styles.main}>
            <PostIdPageHeader />
            <ProfileVideoFull
                postId={postData?.postId || ''}
                postTitle={postData?.postTitle || ''}
                postThumbnail={postData?.postThumbnail || ''}
                numbOfLikes={postData?.numbOfLikes || 0}
                numbOfDisLikes={postData?.numbOfDisLikes || 0}
                numberOfComments={postData?.numberOfComments || 0}
                username={postData?.username || ''}
                userAvatar={postData?.userAvatar || ''}
                postUrl={postData?.postUrl || ''}
                isFocused={isScreenFocused}
            />
        </ThemedView>
    )
}

export default PostId

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})