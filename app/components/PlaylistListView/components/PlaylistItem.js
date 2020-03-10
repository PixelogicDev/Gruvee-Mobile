import React, { memo } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { SetCurrentPlaylistId } from 'Gruvee/redux/actions/playlists/PlaylistActions'
import { FetchMembers } from 'Gruvee/redux/actions/members/MembersActions'
import { MapMembersFromPlaylist } from 'Gruvee/redux/selectors/MembersSelector'

import { Navigation } from 'react-native-navigation'
import * as StyleConstants from 'Gruvee/config/styles'
import * as NavigationConstants from 'Gruvee/config/navigation'
import CardItemDetail from './CardItemDetail'

const defaultPlaylistBackgroundAsset = require('Gruvee/assets/defaults/playlist_image/default_item_bg_image.png')

const PlaylistItem = ({ fetchMembers, playlistData, playlistMembers, setCurrentPlaylistId }) => {
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
const showSongListAction = (fetchMembers, playlistData, playlistMembers, setCurrentPlaylistId) => {
    // Call redux action to set playlistId in our state
    setCurrentPlaylistId(playlistData.id)

    // Any new members from db? Lets get them now so our members list will be good to go.
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
                                name: NavigationConstants.TOP_BAR_MEMBERS_ACTION_NAME,
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
    fetchMembers: playlistId => dispatch(FetchMembers(playlistId)),
    setCurrentPlaylistId: playlistId => dispatch(SetCurrentPlaylistId(playlistId)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(memo(PlaylistItem))
