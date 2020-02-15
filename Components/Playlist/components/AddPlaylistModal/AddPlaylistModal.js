import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Playlist from 'Gruvee/lib/Playlist'
import InputModal from 'Gruvee/Components/Common/InputModal'

// Redux
import { connect } from 'react-redux'
import { AddPlaylist } from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'

import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

const AddPlaylistModal = ({ title, addPlaylist }) => {
    const [playlistNameValue, onChangePlaylistNameText] = React.useState('')
    const [membersNameValue, onChangeMembersNameText] = React.useState('')

    // Actions
    const runPlaylistAction = () => {
        // Create playlist object
        const playlist = new Playlist(playlistNameValue, membersNameValue)

        if (!playlistNameValue) {
            // Stop this and show error?
        }

        // If members are added, we need to pull their objects down from the service
        // Im thinking we can fetch data by ID and then just pull down their objects
        // Then pass them along to store in state

        // Run action to create playlist
        addPlaylist(playlist)

        // Dismiss
        Navigation.dismissOverlay(NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID)
    }

    return (
        <InputModal
            title={title}
            buttonTitle="Create"
            createAction={() => {
                runPlaylistAction()
            }}
            buttonDisabled={!playlistNameValue}
            navigationId={NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID}
        >
            <TextInput
                placeholder="Playlist Name"
                placeholderTextColor={
                    StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                }
                style={styles.Input}
                onChangeText={text => onChangePlaylistNameText(text)}
                value={playlistNameValue}
            />
            <TextInput
                placeholder="Members"
                placeholderTextColor={
                    StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                }
                style={styles.Input}
                onChangeText={text => onChangeMembersNameText(text)}
                value={membersNameValue}
            />
        </InputModal>
    )
}

// Styles
const styles = StyleSheet.create({
    Input: {
        width: '75%',
        marginBottom: 15,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderBottomColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderBottomWidth: 0.5,
    },
})

// Redux Mappers
const mapDispatchToProps = dispatch => ({
    addPlaylist: playlist => dispatch(AddPlaylist(playlist)),
})

export default connect(
    null,
    mapDispatchToProps
)(AddPlaylistModal)
