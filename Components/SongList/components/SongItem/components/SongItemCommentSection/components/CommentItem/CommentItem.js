import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import * as StyleConstants from '@StyleConstants'

const CommentItem = ({ comment }) => {
    return (
        <View style={styles.Container}>
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
        flexDirection: 'column',
        marginLeft: 10,
        paddingVertical: 10,
    },
    DisplayNameText: {
        fontSize: 18,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
})
export default CommentItem
