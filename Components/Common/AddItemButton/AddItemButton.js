import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as NavigationConstants from '@NavigationConstants'

const AddItemButton = ({ style, createAction }) => {
    const navigateToAddPlaylistModal = () => {
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
                    createAction,
                },
            },
        })
    }

    return (
        <TouchableOpacity onPress={navigateToAddPlaylistModal} style={style}>
            <Image
                source={{ uri: 'add_playlist_button' }}
                style={{ width: '100%', height: '100%' }}
            />
        </TouchableOpacity>
    )
}

export default AddItemButton
