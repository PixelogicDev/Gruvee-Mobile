import React, { memo } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import CardItemDetail from './components/PlaylistItemDetail/CardItemDetail'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

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
                defaultSource={{ uri: 'default_item_bg_image' }}
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
    Navigation.push(NavigationConstants.PLAYLIST_NAV_ID, {
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
