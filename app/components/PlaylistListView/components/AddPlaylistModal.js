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
            headerTitle={title}
            buttonTitle="Add"
            createAction={() => {
                runPlaylistAction()
            }}
            buttonDisabled={!playlistNameValue}
            navigationId={NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID}
            inputContainerStyle={styles.InputContainer}
        >
            <TextInput
                placeholder="Playlist Name"
                placeholderTextColor={StyleConstants.BASE_FONT_COLOR}
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
    InputContainer: {
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    Input: {
        width: '100%',
        minHeight: 44,
        padding: StyleConstants.TEXT_INPUT_PADDING,
        borderRadius: 5,
        backgroundColor: '#424242',
        color: 'white',
        fontSize: 12,
        marginBottom: 25,
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
