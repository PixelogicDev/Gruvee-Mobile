import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BackHandler, View, StyleSheet, Platform } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import { ADD_MOCK_DATA } from 'Gruvee/Redux/Actions/ActionsType'
import AddItemButton from 'Gruvee/Components/Common/AddItemButton'
import mockPlaylists from '@Mock/mockPlaylists'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'
import SwipeablePlaylistItem from './components/SwipeablePlaylistItem/SwipeablePlaylistItem'

// Remove broken path warning
console.disableYellowBox = true
console.ignoredYellowBox = ['Could not find image']

const PlaylistListView = props => {
    const [somePlaylist, setPlaylist] = useState([])
    const [addPlaylistModalShown, setAddPlaylistModalShown] = useState(false)
    const keyExtractor = item => `${item.id}`
    const renderItem = ({ item }) => (
        <SwipeablePlaylistItem
            playlistData={item}
            addSongToPlaylistAction={addSongToPlaylistAction}
            deleteSongFromPlaylistAction={deleteSongFromPlaylistAction}
            updateSongsInPlaylistAction={updateSongsInPlaylistAction}
        />
    )

    useEffect(() => {
        // Get playlists and set to props.playlists
        props.fetchPlaylists()

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

    // Redux props
    const { playlists } = props

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

// Action Creators
const fetchPlaylists = () => {
    return { type: ADD_MOCK_DATA }
}

// Redux Mappers
const mapStateToProps = state => {
    return { playlists: state.PlaylistDataReducer.playlists }
}
const mapDispatchToProps = dispatch => ({
    fetchPlaylists: () => dispatch(fetchPlaylists()),
})

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistListView)
