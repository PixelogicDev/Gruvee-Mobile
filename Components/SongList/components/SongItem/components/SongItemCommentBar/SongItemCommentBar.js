import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'

import * as StyleConstants from '@StyleConstants'

const SongItemCommentBar = ({ comments }) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.Text}>{comments.length} Comments</Text>
            <TouchableOpacity>
                <Image style={styles.Image} source={{ uri: 'plus_icon' }} />
            </TouchableOpacity>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    Container: {
        height: 40,
        backgroundColor: StyleConstants.SONG_LIST_COMMENT_BAR_BACKGROUND_COLOR,
        borderBottomLeftRadius: StyleConstants.SONG_LIST_ITEM_BORDER_RADIUS,
        borderBottomRightRadius: StyleConstants.SONG_LIST_ITEM_BORDER_RADIUS,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Text: {
        fontSize: StyleConstants.SONG_LIST_COMMENT_BAR_TEXT_SIZE_iOS,
        color: StyleConstants.CARD_ITEM_DETAIL_FONT_COLOR,
        paddingLeft: 15,
    },
    Image: {
        width: 18,
        height: 18,
        marginRight: 15,
    },
})

export default SongItemCommentBar
