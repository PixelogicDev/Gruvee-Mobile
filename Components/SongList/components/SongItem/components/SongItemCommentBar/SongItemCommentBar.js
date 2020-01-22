import React from 'react'
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

const rightChevronAsset = require('Gruvee/Assets/Icons/RightChevron/right_chevron.png')

// Actions
const navigateToCommentsListAction = (
    songData,
    addCommentFromSongAction,
    deleteCommentFromSongAction
) => {
    Navigation.push(NavigationConstants.STACK_ID, {
        component: {
            name: NavigationConstants.COMMENTS_LIST_NAV_NAME,
            passProps: {
                songId: songData.id,
                comments: songData.comments,
                addCommentFromSongAction,
                deleteCommentFromSongAction,
            },
            options: {
                topBar: {
                    title: {
                        text: 'Comments',
                    },
                },
            },
        },
    })
}

const SongItemCommentBar = ({
    songData,
    addCommentFromSongAction,
    deleteCommentFromSongAction,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => {
                navigateToCommentsListAction(
                    songData,
                    addCommentFromSongAction,
                    deleteCommentFromSongAction
                )
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
        backgroundColor: StyleConstants.DARK_BACKGROUND_COLOR,
        borderBottomLeftRadius: StyleConstants.LIST_ITEM_BORDER_RADIUS,
        borderBottomRightRadius: StyleConstants.LIST_ITEM_BORDER_RADIUS,
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
