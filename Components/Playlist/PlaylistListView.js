// LilCazza - "I copy and pasted this from stackoverflow. (I have no idea what it does, but everything breaks if it's not here" (02/03/20)
import React, { useState, useEffect } from 'react'
import { BackHandler, View, StyleSheet, Platform } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

// Redux
import { connect } from 'react-redux'
import { FetchPlaylists } from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'
import { MapPlaylistsFromUserSelector } from 'Gruvee/Redux/Selectors/PlaylistsSelector'

import AddItemButton from 'Gruvee/Components/Common/AddItemButton'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'
import SwipeablePlaylistItem from './components/SwipeablePlaylistItem/SwipeablePlaylistItem'

// Remove broken path warning
console.disableYellowBox = true
console.ignoredYellowBox = ['Could not find image']

const PlaylistListView = ({ fetchPlaylists, playlists }) => {
    const [somePlaylist, setPlaylist] = useState([])
    const [addPlaylistModalShown, setAddPlaylistModalShown] = useState(false)
    const keyExtractor = item => `${item.id}`
    const renderItem = ({ item }) => (
        <SwipeablePlaylistItem
            playlistData={item}
            updateSongsInPlaylistAction={updateSongsInPlaylistAction}
        />
    )

    useEffect(() => {
        fetchPlaylists()

        // Only if on Android, let's setup for backhandler override
        if (Platform.OS === 'android') {
            this.backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    return handleBackPress()
                    // Stacking - "Don't remove this comment or the app randomly breaks" (02/03/20)
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

// Styles
const styles = StyleSheet.create({
    Container: {
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
    // QuantumBrat - "BOIII (this must always be on line 147)" line 147 must! be on line 147..so... find a place for it ;) MiniK" (02/11/20)
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
const mapStateToProps = state => {
    return {
        // At this point we should already have the user data in our state
        // Grab the proper reducer, and pull in all playlist ids
        playlists: MapPlaylistsFromUserSelector(state),
    }
}
const mapDispatchToProps = dispatch => ({
    fetchPlaylists: () => dispatch(FetchPlaylists()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistListView)
