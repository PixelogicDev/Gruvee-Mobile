import React, { memo } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import images from 'res/images'
import CardItemDetail from './components/PlaylistItemDetail/CardItemDetail'
import * as StyleConstants from 'lib/Helpers/StyleConstants'
import * as NavigationConstants from 'lib/Helpers/NavigationConstants'

const defaultPlaylistBackgroundAsset = images.defaults.playlistBackground

const PlaylistItem = ({ playlistData, deleteSongFromPlaylistAction }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                showSongListAction(playlistData, deleteSongFromPlaylistAction)
            }}
        >
            <ImageBackground
                style={styles.Container}
                source={{ uri: `${playlistData.albumArtworkUrl}` }}
                defaultSource={defaultPlaylistBackgroundAsset}
            >
                <CardItemDetail
                    name={playlistData.name}
                    numMembers={playlistData.members.length}
                    numSongs={playlistData.songs.length}
                />
            </ImageBackground>
        </TouchableOpacity>
    )
}

// Actions
const showSongListAction = (playlistData, deleteSongFromPlaylistAction) => {
    Navigation.push(NavigationConstants.STACK_ID, {
        component: {
            name: NavigationConstants.SONG_LIST_NAV_NAME,
            passProps: {
                playlistId: playlistData.id,
                songs: playlistData.songs,
                deleteSongFromPlaylistAction,
            },
            options: {
                topBar: {
                    title: {
                        text: playlistData.name,
                    },
                },
            },
        },
    })
}

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

export default memo(PlaylistItem)
