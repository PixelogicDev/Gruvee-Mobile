import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import SwipeableCommentItem from './components/SwipeableCommentItem/SwipeableCommentItem'
import * as StyleConstants from '@StyleConstants'

const CommentsList = ({ comments }) => {
    // Actions
    const renderItem = ({ item }) => (
        // Will need to create Swipeable Comment Item
        <SwipeableCommentItem
            comment={item}
            deleteItemById={deleteCommentAction}
        />
    )
    const keyExtractor = item => `${item.id}`

    const deleteCommentAction = commentId => {
        // We are already know what song we are in
        // Just need to filter out the comment with the proper ID
        // Will then need to set state for the updated comment
        // Will also need to set state for the song that was just altered
        // Will also need to set state for the playlist was just altered
    }

    return (
        <SwipeListView
            style={styles.Container}
            // contentContainerStyle={styles.ContentContainer}
            showsVerticalScrollIndicator
            data={comments} // Will probably need state
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
        height: '100%',
    },
})

export default CommentsList
