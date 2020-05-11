import React, { memo } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { SetCurrentPlaylistId } from 'Gruvee/redux/actions/playlists/PlaylistActions'
import { FetchMembers } from 'Gruvee/redux/actions/members/MembersActions'
import { FetchSongs } from 'Gruvee/redux/actions/songs/SongsActions'
import { MapMembersFromPlaylist } from 'Gruvee/redux/selectors/MembersSelector'

import * as StyleConstants from 'Gruvee/config/styles'
import CardItemDetail from './CardItemDetail'

const defaultPlaylistBackgroundAsset = require('Gruvee/assets/defaults/playlist_image/default_item_bg_image.png')

// Styles
const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        overflow: 'hidden',
    },
    DetailContainer: {
        marginTop: 15,
        marginLeft: 15,
    },
})

const PlaylistItem = ({
    fetchSongs,
    fetchMembers,
    playlistData,
    playlistMembers,
    setCurrentPlaylistId,
}) => {
    const imageBackground =
        playlistData.albumArtworkUrl !== '' ? { uri: `${playlistData.albumArtworkUrl}` } : null
    return (
        <TouchableOpacity
            onPress={() => {
                showSongListAction(
                    fetchSongs,
                    fetchMembers,
                    playlistData,
                    playlistMembers,
                    setCurrentPlaylistId
                )
            }}
        >
            <ImageBackground
                style={styles.Container}
                source={imageBackground}
                defaultSource={defaultPlaylistBackgroundAsset}
            >
                <CardItemDetail
                    name={playlistData.name}
                    numMembers={playlistData.members.length}
                    numSongs={playlistData.songs.allSongs.length}
                />
            </ImageBackground>
        </TouchableOpacity>
    )
}

// Actions
const showMembersAction = () => {
    // Navigation.mergeOptions(NavigationConstants.STACK_ID, {
    //     sideMenu: {
    //         right: {
    //             visible: true,
    //         },
    //     },
    // })
}

// sillyonly - "YOU THOUGHT YOU WILL RUN AWAY!" (02/14/20)
const showSongListAction = (
    fetchSongs,
    fetchMembers,
    playlistData,
    playlistMembers,
    setCurrentPlaylistId
) => {
    // Call redux action to set playlistId in our state
    setCurrentPlaylistId(playlistData.id)

    // Any new songs from db? Let's get them now so our songs list will be good to go.
    fetchSongs(playlistData.id)

    // Any new members from db? Lets get them now so our members list will be good to go.
    fetchMembers([playlistData])

    // Navigation.push(NavigationConstants.STACK_ID, {
    //     component: {
    //         name: NavigationConstants.SONG_LIST_NAV_NAME,
    //         passProps: {
    //             playlistId: playlistData.id,
    //         },
    //         options: {
    //             topBar: {
    //                 visible: true,
    //                 barStyle: 'default',
    //                 backButton: {
    //                     color: StyleConstants.TOP_BAR_BACK_BUTTON_COLOR,
    //                 },
    //                 rightButtons: [
    //                     {
    //                         id: NavigationConstants.TOP_BAR_MEMBERS_ACTION_ID,
    //                         component: {
    //                             name: NavigationConstants.TOP_BAR_MEMBERS_ACTION_NAME,
    //                             passProps: {
    //                                 members: playlistMembers,
    //                                 showMembersAction: () => {
    //                                     showMembersAction()
    //                                 },
    //                             },
    //                         },
    //                     },
    //                 ],
    //                 background: {
    //                     color: StyleConstants.TOP_BAR_BACKGROUND_COLOR,
    //                     blur: false,
    //                 },
    //                 title: {
    //                     text: playlistData.name,
    //                     fontSize: StyleConstants.TOP_BAR_TEXT_SIZE,
    //                     color: StyleConstants.TOP_BAR_TEXT_COLOR,
    //                     // iOS Only
    //                     fontWeight: 'medium',
    //                 },
    //             },
    //             sideMenu: {
    //                 right: {
    //                     enabled: true,
    //                 },
    //             },
    //         },
    //     },
    // })
}

// Redux Mappers
const mapStatetoProps = state => ({
    playlistMembers: MapMembersFromPlaylist(state),
})
const mapDispatchToProps = dispatch => ({
    fetchSongs: playlistId => dispatch(FetchSongs(playlistId)),
    fetchMembers: playlistId => dispatch(FetchMembers(playlistId)),
    setCurrentPlaylistId: playlistId => dispatch(SetCurrentPlaylistId(playlistId)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(memo(PlaylistItem))
