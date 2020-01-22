import React, { useState, useEffect } from 'react'
import { BackHandler, View, StyleSheet, Platform } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import AddItemButton from 'Gruvee/Components/Common/AddItemButton'
import SwipeablePlaylistItem from './components/SwipeablePlaylistItem/SwipeablePlaylistItem'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

import mockPlaylists from '@Mock/mockPlaylists'

// Remove broken path warning
console.disableYellowBox = true
console.ignoredYellowBox = ['Could not find image']

const PlaylistListView = () => {
    const [playlists, setPlaylist] = useState([])
    const [addPlaylistModalShown, setAddPlaylistModalShown] = useState(false)
    const keyExtractor = item => `${item.id}`
    const renderItem = ({ item }) => (
        <SwipeablePlaylistItem
            playlistData={item}
            deletePlaylistAction={deletePlaylistAction}
            addSongToPlaylistAction={addSongToPlaylistAction}
            deleteSongFromPlaylistAction={deleteSongFromPlaylistAction}
            updateSongsInPlaylistAction={updateSongsInPlaylistAction}
        />
    )

    useEffect(() => {
        // Call API set to playlists
        setPlaylist([...playlists, ...mockPlaylists])

        // Only if on Android, let's setup for backhandler override
        if (Platform.OS === 'android') {
            this.backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    return handleBackPress()
                }
            )

            // Setup event listener for overlay
            this.compDidAppearListener = Navigation.events().registerComponentDidAppearListener(
                ({ componentId }) => {
                    if (
                        componentId ===
                        NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID
                    ) {
                        setAddPlaylistModalShown(true)
                    }
                }
            )

            this.compDidDisappearListener = Navigation.events().registerComponentDidDisappearListener(
                ({ componentId }) => {
                    if (
                        componentId ===
                        NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID
                    ) {
                        setAddPlaylistModalShown(false)
                    }
                }
            )
        }

        return () => {
            // Again, if on android lets remove all our listeners
            if (Platform.OS === 'android') {
                this.backHandler.remove()
                this.compDidAppearListener.remove()
                this.compDidDisappearListener.remove()
            }
        }
    }, [])

    // Playlist Actions
    const addPlaylistAction = playlist => {
        // Set State
        setPlaylist([...playlists, playlist])
    }

    const deletePlaylistAction = playlistToDeleteId => {
        setPlaylist(
            playlists.filter(playlist => playlist.id !== playlistToDeleteId)
        )
    }

    // Song Actions
    const addSongToPlaylistAction = (playlistId, song) => {
        const playlistsClone = playlists.slice()
        const playlist = playlistsClone.find(p => p.id === playlistId)

        if (playlist) {
            playlist.songs = [...playlist.songs, song]
            setPlaylist(playlistsClone)
        }
    }

    const deleteSongFromPlaylistAction = (playlistId, songId) => {
        const updatedPlaylist = playlists.map(playlist => {
            if (playlist.id === playlistId) {
                playlist.songs = playlist.songs.filter(
                    song => song.id !== songId
                )
            }

            return playlist
        })

        setPlaylist(updatedPlaylist)
    }

    // Comments Actions
    const updateSongsInPlaylistAction = (playlistId, songs) => {
        const updatedPlaylist = playlists.map(playlist => {
            if (playlist.id === playlistId) {
                playlist.songs = songs
            }

            return playlist
        })

        setPlaylist(updatedPlaylist)
    }

    const handleBackPress = () => {
        if (addPlaylistModalShown) {
            Navigation.dismissOverlay(
                NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID
            )
            return true
        }
        return false
    }

    const navigateToAddPlaylistModalAction = () => {
        // Navigate to add playlist modal
        Navigation.showOverlay({
            component: {
                id: NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID,
                name: NavigationConstants.ADD_PLAYLIST_MODAL_NAV_NAME,
                options: {
                    overlay: {
                        interceptTouchOutside: false,
                    },
                },
                passProps: {
                    title: 'Add Playlist',
                    addPlaylistAction,
                },
            },
        })
    }

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                data={playlists}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />

            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddItemButton
                    style={styles.Button}
                    addItemAction={navigateToAddPlaylistModalAction}
                />
            </View>
        </>
    )
}

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

export default PlaylistListView
