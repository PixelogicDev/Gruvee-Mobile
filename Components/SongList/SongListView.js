import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import spotifyMockFindResponse from 'Gruvee/Mock/spotifyMockFindResponse'
import AddItemButton from 'Gruvee/Components/Common/AddItemButton'
import SwipeableSongItem from './components/SwipeableSongItem/SwipeableSongItem'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'
import Song from '../../lib/Song'

const SongListView = ({
    playlistId,
    songs,
    addSongToPlaylistAction,
    deleteSongFromPlaylistAction,
}) => {
    const [songsToDisplay, setSongsToDisplay] = useState([])

    useEffect(() => {
        setSongsToDisplay(songs)
    }, [])

    // Actions
    const addSongAction = (songLink, comment) => {
        // TODO: Call service API to get song info from link
        // Right not we are just going to mock it up until auth is setup

        // Create song object
        const newSong = new Song(spotifyMockFindResponse, songLink, comment)

        // Set songs to display
        setSongsToDisplay([...songsToDisplay, newSong])

        // Add to playlist
        addSongToPlaylistAction(playlistId, newSong)

        // Dismiss song modal overlay
        Navigation.dismissOverlay(NavigationConstants.ADD_SONG_MODAL_NAV_ID)
    }

    const deleteItemById = id => {
        // TODO: Add some sort of promise
        // If the first filter fails, lets not do the next one

        // Filter out from current state
        setSongsToDisplay(songsToDisplay.filter(song => song.id !== id))

        // Filter out song from parent state
        deleteSongFromPlaylistAction(playlistId, id)
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

        setSongsToDisplay(updatedSongs)
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

    const renderItem = ({ item }) => (
        <SwipeableSongItem
            song={item}
            deleteItemById={() => deleteItemById(item.id)}
            deleteCommentFromSongAction={deleteCommentFromSongAction}
        />
    )

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator
                data={songsToDisplay}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddItemButton
                    style={styles.Button}
                    modalNavigateAction={navigateToAddSongModalAction}
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

export default SongListView
