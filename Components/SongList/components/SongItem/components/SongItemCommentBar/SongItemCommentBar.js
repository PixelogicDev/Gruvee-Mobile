import React from 'react'
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as StyleConstants from '@StyleConstants'

const rightChevronAsset = require('Gruvee/Assets/Icons/RightChevron/right_chevron.png')

const SongItemCommentBar = ({ songData }) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => {
                // ADD NAVIGATION TO COMMENTS VIEW
            }}
        >
            <Text style={styles.Text}>{songData.comments.length} Comments</Text>
            <Image style={styles.Image} source={rightChevronAsset} />
        </TouchableOpacity>
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
        width: 16,
        height: 16,
        marginRight: 15,
    },
})

export default SongItemCommentBar
