import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import * as StyleConstants from 'Gruvee/config/styles'

const CommentItem = ({ comment, setHeightAction }) => {
    return (
        <View
            style={styles.Container}
            onLayout={event => {
                const { height } = event.nativeEvent.layout
                setHeightAction(height)
            }}
        >
            <Text style={styles.DisplayNameText}>{comment.sender}</Text>
            <Text style={styles.CommentText}>{comment.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    CommentText: {
        fontSize: 14,
        fontWeight: StyleConstants.LIGHT_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    Container: {
        minHeight: StyleConstants.COMMENT_ITEM_MIN_HEIGHT,
        backgroundColor: StyleConstants.DARK_BACKGROUND_COLOR,
        borderRadius: StyleConstants.LIST_ITEM_BORDER_RADIUS,
        flexDirection: 'column',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    DisplayNameText: {
        fontSize: 18,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
})
export default CommentItem
