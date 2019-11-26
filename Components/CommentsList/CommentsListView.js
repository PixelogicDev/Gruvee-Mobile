import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

import SwipeableCommentItem from './components/SwipeableCommentItem/SwipeableCommentItem'
import AddCommentTextInput from './components/AddCommentTextInput/AddCommentTextInput'
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
        <SafeAreaView style={styles.Container}>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <SwipeListView
                    style={{ height: '90%' }}
                    contentContainerStyle={styles.ContentContainer}
                    showsVerticalScrollIndicator
                    data={commentsState}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
                <AddCommentTextInput style={{ height: '10%' }} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
        height: '100%',
    },
    ContentContainer: {
        padding: StyleConstants.TABLE_CONTAINER_CONTENT_SPACING,
    },
})

export default CommentsList
