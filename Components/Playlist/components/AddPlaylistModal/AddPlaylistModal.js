import React from 'react'
import {
    Dimensions,
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import Playlist from 'Gruvee/lib/Playlist'
import AddPlaylistButton from '../CreatePlaylistButton/AddPlaylistButton'

import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
const getModalHeight =
    Platform.OS === 'android'
        ? StyleConstants.MODAL_HEIGHT_ANDROID
        : StyleConstants.MODAL_HEIGHT_iOS

const AddPlaylistModal = ({ createAction }) => {
    const [playlistNameValue, onChangePlaylistNameText] = React.useState('')
    const [membersNameValue, onChangeMembersNameText] = React.useState('')

    // Actions
    const createPlaylistAction = () => {
        // Create playlist object
        const playlist = new Playlist(playlistNameValue, membersNameValue)

        if (!playlistNameValue) {
            // Why is this here?
        }

        // Run action to create playlist
        createAction(playlist)

        // Dismiss
        Navigation.dismissOverlay(NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID)
    }

    const dismissOverlayAction = () => {
        Navigation.dismissOverlay(NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID)
    }

    const modalView = (
        <View style={styles.Modal}>
            <Text style={styles.Header}>Let's Get Grüvee</Text>
            <View style={styles.InputContainer}>
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
            </View>
            <AddPlaylistButton
                name={playlistNameValue}
                members={membersNameValue}
                createAction={createPlaylistAction}
                disabled={!playlistNameValue}
            />
        </View>
    )

    return (
        <>
            <View
                onStartShouldSetResponder={() => dismissOverlayAction()}
                style={styles.Backdrop}
            />
            {modalView}
        </>
    )
}

// Styles
const styles = StyleSheet.create({
    Backdrop: {
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
        opacity: 1.0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Modal: {
        position: 'absolute',
        width: '90%',
        height: getModalHeight,
        // This is to center the modal absolutely in the background view
        top: '50%',
        left: '50%',
        transform: [
            {
                translateX: -(screenWidth * 0.9) / 2,
            },
            {
                // Need to remember to substract status bar / nav bar height as well
                translateY: -(screenHeight / 2 - getModalHeight - 90),
            },
        ],
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
    },
    Header: {
        fontSize: StyleConstants.MODAL_HEADER_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        paddingTop: 10,
        textAlign: 'center',
    },
    InputContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
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

export default AddPlaylistModal
