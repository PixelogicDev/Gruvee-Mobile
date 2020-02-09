import React from 'react'

// Redux
import { connect } from 'react-redux'

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
                    visible: true,
                    barStyle: 'default',
                    backButton: {
                        showTitle: false,
                        color: StyleConstants.TOP_BAR_BACK_BUTTON_COLOR,
                    },
                    background: {
                        color: StyleConstants.TOP_BAR_BACKGROUND_COLOR,
                        blur: false,
                    },
                    title: {
                        text: songData.name,
                        fontSize: StyleConstants.TOP_BAR_TEXT_SIZE,
                        color: StyleConstants.TOP_BAR_TEXT_COLOR,
                        // iOS Only
                        fontWeight: 'medium',
                    },
                },
            },
        },
    })
}

const SongItemCommentBar = ({
    songCommentCount,
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
            <Text style={styles.Text}>{songCommentCount} Comments</Text>
            <Image style={styles.Image} source={rightChevronAsset} />
        </TouchableOpacity>
    )
}

// Helpers
const mapStateToSongCommentsCount = (state, songId) => {
    const { currentPlaylistId } = state.PlaylistsDataReducer
    const playlist =
        state.PlaylistsDataReducer.playlists.byId[currentPlaylistId]

    return playlist.comments[songId].length
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

// Redux Mappers
const mapStateToProps = (state, props) => {
    // Should get songIds from playlist and map accordingly
    return {
        songCommentCount: mapStateToSongCommentsCount(state, props.songData.id),
    }
}

export default connect(
    mapStateToProps,
    null
)(SongItemCommentBar)
