import React, { memo } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import CardItemDetail from './components/PlaylistItemDetail/CardItemDetail'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

const defaultPlaylistBackgroundAsset = require('Gruvee/Assets/Defaults/PlaylistImage/default_item_bg_image.png')

const PlaylistItem = ({ playlistData, updateSongsInPlaylistAction }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                showSongListAction(playlistData, updateSongsInPlaylistAction)
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
const showMembersAction = () => {
    Navigation.mergeOptions(NavigationConstants.STACK_ID, {
        sideMenu: {
            right: {
                visible: true,
            },
        },
    })
}

const showSongListAction = (playlistData, updateSongsInPlaylistAction) => {
    Navigation.push(NavigationConstants.STACK_ID, {
        component: {
            name: NavigationConstants.SONG_LIST_NAV_NAME,
            passProps: {
                playlistId: playlistData.id,
                updateSongsInPlaylistAction,
            },
            options: {
                topBar: {
                    visible: true,
                    barStyle: 'default',
                    backButton: {
                        color: StyleConstants.TOP_BAR_BACK_BUTTON_COLOR,
                    },
                    rightButtons: [
                        {
                            id: NavigationConstants.TOP_BAR_MEMBERS_ACTION_ID,
                            component: {
                                name:
                                    NavigationConstants.TOP_BAR_MEMBERS_ACTION_NAME,
                                passProps: {
                                    showMembersAction: () => {
                                        showMembersAction()
                                    },
                                },
                            },
                        },
                    ],
                    background: {
                        color: StyleConstants.TOP_BAR_BACKGROUND_COLOR,
                        blur: false,
                    },
                    title: {
                        text: playlistData.name,
                        fontSize: StyleConstants.TOP_BAR_TEXT_SIZE,
                        color: StyleConstants.TOP_BAR_TEXT_COLOR,
                        // iOS Only
                        fontWeight: 'medium',
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
