import React from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import CommentItem from './components/CommentItem/CommentItem'
import * as StyleConstants from '@StyleConstants'

const CommentsList = ({ comments }) => {
    // Actions
    const renderItem = ({ item }) => (
        // Will need to create Swipeable Comment Item
        <CommentItem comment={item} />
    )
    const keyExtractor = item => `${item.id}`

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
