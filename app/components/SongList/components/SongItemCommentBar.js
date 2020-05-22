import React from 'react'

// Redux
import { connect } from 'react-redux'

import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COMMENTS_LIST_NAV_NAME } from 'Gruvee/config/navigation/constants'
import * as StyleConstants from 'Gruvee/config/styles'

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

const rightChevronAsset = require('Gruvee/assets/icons/right_chevron/right_chevron.png')

const SongItemCommentBar = ({ songCommentCount, songData }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={navigateToCommentsList(navigation, songData)}
        >
            <Text style={styles.Text}>{songCommentCount} Comments</Text>
            <Image style={styles.Image} source={rightChevronAsset ?? null} />
        </TouchableOpacity>
    )
}

// Helpers

// Actions
const navigateToCommentsList = (navigation, songData) => () => {
    navigation.push(COMMENTS_LIST_NAV_NAME, { songId: songData.id, songName: songData.name })
}

const mapStateToSongCommentsCount = (state, songId) => {
    const { currentPlaylistId } = state.PlaylistsDataReducer
    const playlist = state.PlaylistsDataReducer.playlists.byId[currentPlaylistId]

    return playlist.comments[songId] ? playlist.comments[songId].length : 0
}

// Redux Mappers
const mapStateToProps = (state, props) => {
    // Should get songIds from playlist and map accordingly
    return {
        songCommentCount: mapStateToSongCommentsCount(state, props.songData.id),
    }
}

export default connect(mapStateToProps, null)(SongItemCommentBar)
