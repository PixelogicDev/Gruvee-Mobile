import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

// Redux
import { FetchComments } from 'Gruvee/Redux/Actions/Comments/CommentsActions'
import { MapCommentsFromSong } from 'Gruvee/Redux/Selectors/CommentsSelector'

import SwipeableCommentItem from './components/SwipeableCommentItem/SwipeableCommentItem'
import AddCommentTextInput from './components/AddCommentTextInput/AddCommentTextInput'
import * as StyleConstants from '@StyleConstants'
import SongComment from '../../lib/SongComment'

const CommentsList = ({
    songId,
    comments,
    fetchComments,
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
    // Should get songIds from playlist and map accordingly
    return { comments: MapCommentsFromSong(state, props.songId) }
}
const mapDispatchToProps = dispatch => ({
    fetchComments: songId => dispatch(FetchComments(songId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsList)
