import React, { memo } from 'react'

// Redux
import { connect } from 'react-redux'
import { SetCurrentPlaylistId } from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'
import { MapMembersFromPlaylist } from 'Gruvee/Redux/Selectors/MembersSelector'

import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import CardItemDetail from './components/PlaylistItemDetail/CardItemDetail'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

const defaultPlaylistBackgroundAsset = require('Gruvee/Assets/Defaults/PlaylistImage/default_item_bg_image.png')

const PlaylistItem = ({
    fetchMembers,
    playlistData,
    playlistMembers,
    setCurrentPlaylistId,
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                showSongListAction(
                    fetchMembers,
                    playlistData,
                    playlistMembers,
                    setCurrentPlaylistId
                )
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

// sillyonly - "YOU THOUGHT YOU WILL RUN AWAY!" (02/14/20)
const showSongListAction = (
    fetchMembers,
    playlistData,
    playlistMembers,
    setCurrentPlaylistId
) => {
    // Call redux action to set playlistId in our state
    setCurrentPlaylistId(playlistData.id)

    fetchMembers(playlistData.id)

    Navigation.push(NavigationConstants.STACK_ID, {
        component: {
            name: NavigationConstants.SONG_LIST_NAV_NAME,
            passProps: {
                playlistId: playlistData.id,
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
                                    members: playlistMembers,
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
                sideMenu: {
                    right: {
                        enabled: true,
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

// Redux Mappers
const mapStatetoProps = state => ({
    playlistMembers: MapMembersFromPlaylist(state),
})
const mapDispatchToProps = dispatch => ({
    setCurrentPlaylistId: playlistId =>
        dispatch(SetCurrentPlaylistId(playlistId)),
})

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(memo(PlaylistItem))
