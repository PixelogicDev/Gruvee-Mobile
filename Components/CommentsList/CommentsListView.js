import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import SwipeableCommentItem from './components/SwipeableCommentItem/SwipeableCommentItem'
import * as StyleConstants from '@StyleConstants'

const CommentsList = ({ songId, comments, deleteCommentFromSongAction }) => {
    const [commentsState, setCommentsState] = useState([])

    // Actions
    const renderItem = ({ item }) => (
        <SwipeableCommentItem
            comment={item}
            deleteItemById={deleteCommentAction}
        />
    )
    const keyExtractor = item => `${item.id}`

    const deleteCommentAction = commentId => {
        // Set comments state
        setCommentsState(
            commentsState.filter(comment => comment.id !== commentId)
        )

        // Delete comment from song
        deleteCommentFromSongAction(songId, commentId)
    }

    useEffect(() => {
        setCommentsState(comments)
    }, [])

    return (
        <SwipeListView
            style={styles.Container}
            // contentContainerStyle={styles.ContentContainer}
            showsVerticalScrollIndicator
            data={commentsState}
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
