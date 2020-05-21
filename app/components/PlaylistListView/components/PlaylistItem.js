import React, { memo } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { SetCurrentPlaylistId } from 'Gruvee/redux/actions/playlists/PlaylistActions'
import { FetchMembers } from 'Gruvee/redux/actions/members/MembersActions'
import { FetchSongs } from 'Gruvee/redux/actions/songs/SongsActions'
import { MapMembersFromPlaylist } from 'Gruvee/redux/selectors/MembersSelector'
import { useNavigation } from '@react-navigation/native'
import { SONG_LIST_NAV_NAME } from 'Gruvee/config/navigation'

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
    const navigation = useNavigation()
    const imageBackground =
        playlistData.albumArtworkUrl !== '' ? { uri: `${playlistData.albumArtworkUrl}` } : null
x
    return (
        <TouchableOpacity
            onPress={() => {
                showSongListAction(
                    fetchSongs,
                    fetchMembers,
                    playlistData,
                    playlistMembers,
                    setCurrentPlaylistId,
                    navigation
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

// sillyonly - "YOU THOUGHT YOU WILL RUN AWAY!" (02/14/20)
const showSongListAction = (
    fetchSongs,
    fetchMembers,
    playlistData,
    playlistMembers,
    setCurrentPlaylistId,
    navigation
) => {
    // Call redux action to set playlistId in our state
    setCurrentPlaylistId(playlistData.id)

    // Any new songs from db? Let's get them now so our songs list will be good to go.
    fetchSongs(playlistData.id)

    // Any new members from db? Lets get them now so our members list will be good to go.
    fetchMembers([playlistData])

    navigation.navigate(SONG_LIST_NAV_NAME)
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
