import React, { useState, useEffect, useRef } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

import SwipeableCommentItem from './components/SwipeableCommentItem/SwipeableCommentItem'
import AddCommentTextInput from './components/AddCommentTextInput/AddCommentTextInput'
import * as StyleConstants from '@StyleConstants'
import SongComment from '../../lib/SongComment'

const CommentsList = ({
    songId,
    comments,
    addCommentFromSongAction,
    deleteCommentFromSongAction,
}) => {
    const commentsListRef = useRef(null)
    const [commentsState, setCommentsState] = useState([])

    // Actions
    const renderItem = ({ item }) => (
        <SwipeableCommentItem
            comment={item}
            deleteItemById={deleteCommentAction}
        />
    )

    const keyExtractor = item => `${item.id}`

    const addCommentAction = comment => {
        // Set Comment List View State
        const newComments = [
            ...commentsState,
            new SongComment(comment, 'YaBoiAlec'),
        ]

        setCommentsState(newComments)
        addCommentFromSongAction(songId, newComments)
    }

    const deleteCommentAction = commentId => {
        // Set comments state
        setCommentsState(
            commentsState.filter(comment => comment.id !== commentId)
        )

        // Delete comment from song
        deleteCommentFromSongAction(songId, commentId)
    }

    const runScrollToEnd = () => {
        if (commentsListRef && commentsListRef.current.scrollToEnd) {
            commentsListRef.current.scrollToEnd()
        }
    }

    useEffect(() => {
        setCommentsState(comments)
    }, [])

    return (
        <SafeAreaView style={styles.Container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 135 : 150}
            >
                <SwipeListView
                    // eslint-disable-next-line no-return-assign
                    listViewRef={ref => (commentsListRef.current = ref)}
                    style={{ height: '90%' }}
                    contentContainerStyle={styles.ContentContainer}
                    showsVerticalScrollIndicator
                    data={commentsState}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
                <View style={styles.Separator} />
                <AddCommentTextInput
                    style={{ height: '10%' }}
                    addCommentAction={addCommentAction}
                    scrollToBottomAction={runScrollToEnd}
                />
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
    Separator: {
        width: '100%',
        height: 1,
        backgroundColor: StyleConstants.SEPERATOR_BACKGROUND_COLOR,
    },
})

export default CommentsList
