import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Playlist from 'Gruvee/lib/Playlist'
import InputModal from 'Gruvee/components/common/InputModal'
import AlgoliaSearch from 'Gruvee/components/common/AlgoliaSearch'

// Redux
import { connect } from 'react-redux'
import { AddPlaylist } from 'Gruvee/redux/actions/playlists/PlaylistActions'

import * as StyleConstants from 'Gruvee/config/styles'
import * as NavigationConstants from 'Gruvee/config/navigation'

const AddPlaylistModal = ({ addPlaylist, currentUser, title }) => {
    const [playlistNameValue, onChangePlaylistNameText] = React.useState('')
    const [membersNameValue, onChangeMembersNameText] = React.useState('')

    // Actions
    const runPlaylistAction = async () => {
        try {
            // Create playlist object
            const playlist = new Playlist(playlistNameValue, membersNameValue, currentUser)

            if (!playlistNameValue) {
                // TODO: Stop this and show some UI to add name
                console.log('PlaylistNameValue is empty')
                return
            }

            // TODO: We will need some "find user" support here...

            // Run action to create playlists
            await addPlaylist(playlist)

            // TODO: We will probably want to add some sort of loading indicator to our button

            // Dismiss
            Navigation.dismissOverlay(NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID)
        } catch (error) {
            console.warn(error)
        }
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
                placeholderTextColor={StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR}
                style={styles.Input}
                onChangeText={text => onChangePlaylistNameText(text)}
                value={playlistNameValue}
            />
            <AlgoliaSearch attribute="username" />
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
const mapStateToProps = state => {
    return {
        currentUser: state.UserDataReducer.user,
    }
}
const mapDispatchToProps = dispatch => ({
    addPlaylist: playlist => dispatch(AddPlaylist(playlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPlaylistModal)
