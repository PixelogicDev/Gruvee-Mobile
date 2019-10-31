import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import * as StyleConstants from '@StyleConstants'

const SongItemCommentSection = () => {
    return (
        <View style={styles.Container}>
            <Text style={{ color: '#FFF' }}>HI I AM A COMMENTS ITEM</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: StyleConstants.SONG_LIST_COMMENT_SECTION_HEIGHT,
        backgroundColor: '#000000',
    },
})

export default SongItemCommentSection
