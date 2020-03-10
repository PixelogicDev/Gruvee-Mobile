import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

// Redux
import { DeleteComment, FetchComments } from 'Gruvee/redux/actions/comments/CommentsActions'
import { AddComment } from 'Gruvee/redux/actions/comments/SharedCommentActions'
import { MapCommentsFromSongSelector } from 'Gruvee/redux/selectors/CommentsSelector'

import * as StyleConstants from 'Gruvee/config/styles'
import SongComment from 'Gruvee/lib/SongComment'

import SwipeableCommentItem from './components/SwipeableCommentItem'
import AddCommentTextInput from './components/AddCommentTextInput'

const CommentsList = ({
    currentPlaylistId,
    songId,
    comments,
    addComment,
    deleteComment,
    fetchComments,
}) => {
    const commentsListRef = useRef(null)

    // Actions
    const renderItem = ({ item }) => (
        <SwipeableCommentItem
            comment={item}
            deleteItemById={() => deleteComment(item.id, songId, currentPlaylistId)}
        />
    )

    const keyExtractor = item => `${item.id}`

    const addCommentAction = comment => {
        const newComment = comment.length ? new SongComment(comment, 'memberAlec') : null
        addComment(newComment, songId, currentPlaylistId)
    }

    const runScrollToEnd = () => {
        if (commentsListRef && commentsListRef.current.scrollToEnd) {
            commentsListRef.current.scrollToEnd()
        }
    }

    useEffect(() => {
        fetchComments(songId)
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
                    data={comments}
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

// Redux Mappers
const mapStateToProps = (state, props) => {
    return {
        currentPlaylistId: state.PlaylistsDataReducer.currentPlaylistId,
        comments: MapCommentsFromSongSelector(state, props),
    }
}
const mapDispatchToProps = dispatch => ({
    addComment: (comment, songId, playlistId) => dispatch(AddComment(comment, songId, playlistId)),
    deleteComment: (commentId, songId, currentPlaylistId) =>
        dispatch(DeleteComment(commentId, songId, currentPlaylistId)),
    fetchComments: songId => dispatch(FetchComments(songId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
