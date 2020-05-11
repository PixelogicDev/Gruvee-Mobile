import React from 'react'

// Redux
import { connect } from 'react-redux'

import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'

const rightChevronAsset = require('Gruvee/assets/icons/right_chevron/right_chevron.png')

// Actions
const navigateToCommentsListAction = songData => {
    // Navigation.push(NavigationConstants.STACK_ID, {
    //     component: {
    //         name: NavigationConstants.COMMENTS_LIST_NAV_NAME,
    //         passProps: {
    //             songId: songData.id,
    //             comments: songData.comments,
    //         },
    //         options: {
    //             topBar: {
    //                 visible: true,
    //                 barStyle: 'default',
    //                 backButton: {
    //                     showTitle: false,
    //                     color: StyleConstants.TOP_BAR_BACK_BUTTON_COLOR,
    //                 },
    //                 background: {
    //                     color: StyleConstants.TOP_BAR_BACKGROUND_COLOR,
    //                     blur: false,
    //                 },
    //                 title: {
    //                     text: songData.name,
    //                     fontSize: StyleConstants.TOP_BAR_TEXT_SIZE,
    //                     color: StyleConstants.TOP_BAR_TEXT_COLOR,
    //                     // iOS Only
    //                     fontWeight: 'medium',
    //                 },
    //             },
    //         },
    //     },
    // })
}

const SongItemCommentBar = ({ songCommentCount, songData }) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => {
                navigateToCommentsListAction(songData)
            }}
        >
            <Text style={styles.Text}>{songCommentCount} Comments</Text>
            <Image style={styles.Image} source={rightChevronAsset ?? null} />
        </TouchableOpacity>
    )
}

// Helpers
const mapStateToSongCommentsCount = (state, songId) => {
    const { currentPlaylistId } = state.PlaylistsDataReducer
    const playlist = state.PlaylistsDataReducer.playlists.byId[currentPlaylistId]

    return playlist.comments[songId] ? playlist.comments[songId].length : 0
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

export default connect(mapStateToProps, null)(SongItemCommentBar)
