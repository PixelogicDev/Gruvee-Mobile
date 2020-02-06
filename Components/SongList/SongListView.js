// sillyonly - "I have tooooo many of these" (01/30/20)
// estrangedHD - "Can I also have one?" (01/30/20)
// estrangedHD - "And another one Kappa" (01/30/20)
// estrangedHD - "And another one Kappa" (01/30/20)
// dra031cko - "Spread everything, spread often." (02/04/20)

import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

// Redux
import { connect } from 'react-redux'
import {
    AddSong,
    DeleteSong,
    FetchSongs,
} from 'Gruvee/Redux/Actions/Songs/SongsActions'
import { MapSongsFromPlaylist } from 'Gruvee/Redux/Actions/Songs/Selectors'

import spotifyMockFindResponse from 'Gruvee/Mock/spotifyMockFindResponse'
import AddItemButton from 'Gruvee/Components/Common/AddItemButton'
import SwipeableSongItem from './components/SwipeableSongItem/SwipeableSongItem'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'
import Song from '../../lib/Song'

const SongListView = ({
    playlistId,
    songs,
    fetchSongs,
    addSong,
    deleteSong,
    updateSongsInPlaylistAction,
}) => {
    const [songsToDisplay, setSongsToDisplay] = useState([])

    useEffect(() => {
        // We should fetch the newest data on component load here.
        fetchSongs(playlistId)
    }, [])

    // Actions
    const addSongAction = (songLink, comment) => {
        // TODO: Call service API to get song info from link

        // Create song object
        const newSong = new Song(spotifyMockFindResponse, songLink, comment)

        // Right not we are just going to mock it up until auth is setup
        addSong(playlistId, newSong)

        // Dismiss song modal overlay
        Navigation.dismissOverlay(NavigationConstants.ADD_SONG_MODAL_NAV_ID)
    }

    const addCommentFromSongAction = (songId, comments) => {
        const updatedSongs = songsToDisplay.map(song => {
            if (song.id === songId) {
                song.comments = comments
            }

            return song
        })

        // Update songState
        setSongsToDisplay(updatedSongs)

        // Update playlistState
        updateSongsInPlaylistAction(playlistId, updatedSongs)
    }

    const deleteCommentFromSongAction = (songId, commentId) => {
        const updatedSongs = songsToDisplay.map(song => {
            if (song.id === songId) {
                song.comments = song.comments.filter(
                    comment => comment.id !== commentId
                )
            }

            return song
        })

        // Update songState
        setSongsToDisplay(updatedSongs)

        // Update playlistState
        updateSongsInPlaylistAction(playlistId, updatedSongs)
    }

    const navigateToAddSongModalAction = () => {
        // Navigate to add playlist modal
        Navigation.showOverlay({
            component: {
                id: NavigationConstants.ADD_SONG_MODAL_NAV_ID,
                name: NavigationConstants.ADD_SONG_MODAL_NAV_NAME,
                options: {
                    overlay: {
                        interceptTouchOutside: false,
                    },
                },
                passProps: {
                    title: 'Add Song',
                    addSongAction,
                },
            },
        })
    }

    // dra031cko - "WUBBA LUBBA DUB DUB" (02/01/20)
    const renderItem = ({ item }) => (
        <SwipeableSongItem
            song={item}
            deleteSongById={() => deleteSong(playlistId, item.id)}
            addCommentFromSongAction={addCommentFromSongAction}
            deleteCommentFromSongAction={deleteCommentFromSongAction}
            updateSongsInPlaylistAction={updateSongsInPlaylistAction}
        />
    )

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator
                data={songs}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddItemButton
                    style={styles.Button}
                    addItemAction={navigateToAddSongModalAction}
                />
            </View>
        </>
    )
}

const keyExtractor = item => `${item.id}`

// Styles
const styles = StyleSheet.create({
    Container: {
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
    ContentContainer: {
        padding: StyleConstants.TABLE_CONTAINER_CONTENT_SPACING,
        paddingBottom: StyleConstants.TABLE_CONTAINER_BOTTOM_PADDING,
    },
    ButtonContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    Button: {
        width: StyleConstants.ADD_BUTTON_SIZE,
        height: StyleConstants.ADD_BUTTON_SIZE,
    },
})

// Redux Mappers
const mapStateToProps = (state, props) => {
    // Should get songIds from playlist and map accordingly
    return { songs: MapSongsFromPlaylist(state, props.playlistId) }
}
const mapDispatchToProps = dispatch => ({
    addSong: (playlistId, song) => dispatch(AddSong(playlistId, song)),
    deleteSong: (playlistId, songId) =>
        dispatch(DeleteSong(playlistId, songId)),
    fetchSongs: playlistId => dispatch(FetchSongs(playlistId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongListView)
