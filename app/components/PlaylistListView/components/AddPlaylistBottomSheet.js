// syszen - "note: nokia 3310 - the most indestructible phone ever, this app will be release on it at 2021" (04/03/20)
import React, { forwardRef, useState } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import BottomSheet from 'reanimated-bottom-sheet'
import AlgoliaSearch from 'Gruvee/components/common/AlgoliaSearch'
import CreateItemActionButton from 'Gruvee/components/common/CreateItemActionButton'
import Playlist from 'Gruvee/lib/Playlist'
import { APPLE_ENDPOINTS } from 'Gruvee/service/endpointConstants'

// Redux
import { connect } from 'react-redux'
import { AddPlaylist } from 'Gruvee/redux/actions/playlists/PlaylistActions'

import {
    APPLE_MUSIC_PLAYLIST_TITLE,
    PRESENTED_APPLE_MUSIC_PROMPT,
} from 'Gruvee/config/asyncStorageKeys'
import * as StyleConstants from '@StyleConstants'

const windowHeight = Dimensions.get('window').height
// These hardcoded values suck, but there isn't a solid way I can see to get the proper nav heights
const screenHeight = Platform.OS === 'ios' ? windowHeight - 94 : windowHeight - 84
const timeIcon = require('Gruvee/assets/icons/times/times_icon.png')

// Styles
const styles = StyleSheet.create({
    CloseButtonContainer: {
        alignSelf: 'flex-end',
        width: 28,
        height: 28,
        marginTop: 20,
        borderRadius: 14,
        backgroundColor: '#5C5C5CB3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CloseButtonIcon: {
        height: 14,
        width: 14,
    },
    Header: {
        fontSize: StyleConstants.MODAL_HEADER_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        paddingTop: 10,
        paddingBottom: 25,
        textAlign: 'center',
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
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
    InputContainer: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
    },
})

const AddPlaylistBottomSheet = ({ addPlaylist, currentUser, bottomSheetRef }) => {
    const [playlistNameText, setPlaylistNameText] = useState('')
    const [selectedUsers, setSelectedUser] = useState([])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[screenHeight, screenHeight / 2, 0]}
            borderRadius={10}
            initialSnap={2}
            renderContent={() =>
                generateSheetContent(
                    addPlaylist,
                    currentUser,
                    setPlaylistNameText,
                    playlistNameText,
                    addPlaylistAction,
                    bottomSheetRef,
                    selectedUsers,
                    setSelectedUser
                )
            }
        />
    )
}

// Actions
const generateSheetContent = (
    addPlaylist,
    currentUser,
    setPlaylistNameText,
    playlistNameText,
    addPlaylistAction,
    bottomSheetRef,
    selectedUsers,
    setSelectedUser
) => (
    <View style={styles.InputContainer}>
        <TouchableOpacity
            style={styles.CloseButtonContainer}
            onPress={() => {
                dismissBottomSheet(bottomSheetRef, setPlaylistNameText, setSelectedUser)
            }}
        >
            <Image style={styles.CloseButtonIcon} source={timeIcon ?? null} />
        </TouchableOpacity>
        <Text style={styles.Header}>Add Playlist</Text>
        <TextInput
            placeholder="Playlist Name"
            placeholderTextColor={StyleConstants.BASE_FONT_COLOR}
            style={styles.Input}
            onChangeText={text => setPlaylistNameText(text)}
            value={playlistNameText}
        />
        <View>
            <AlgoliaSearch
                attribute="username"
                selectedUsers={selectedUsers}
                setSelectedUser={setSelectedUser}
            />
            <CreateItemActionButton
                title="Add"
                createAction={() => {
                    addPlaylistAction(
                        addPlaylist,
                        currentUser,
                        selectedUsers.map(user => user.id),
                        playlistNameText,
                        setPlaylistNameText,
                        bottomSheetRef,
                        setSelectedUser
                    )
                }}
                disabled={!playlistNameText}
            />
        </View>
    </View>
)

// Actions
const clearInputs = (setPlaylistNameText, setSelectedUser) => {
    // Clear playlist name
    setPlaylistNameText('')

    // Clear all users
    setSelectedUser([])
}

const dismissBottomSheet = (bottomSheetRef, setPlaylistNameText, setSelectedUser) => {
    // Dismiss - We will need to dismiss our card
    if (bottomSheetRef.current) {
        // TODO: To fix current issue with dismissing card, call this thing twice
        bottomSheetRef.current.snapTo(2)
        bottomSheetRef.current.snapTo(2)
    }

    // Clear playlist name
    clearInputs(setPlaylistNameText, setSelectedUser)

    // If keyboard is open, dismiss it
    Keyboard.dismiss()
}

const openAppleAuth = (bottomSheetRef, setPlaylistNameText, playlistName, setSelectedUser) => {
    if (Linking.canOpenURL(APPLE_ENDPOINTS.authorizeAppleUser)) {
        Linking.openURL(APPLE_ENDPOINTS.authorizeAppleUser)

        // We save the playlist name here so we can use it after deeplink
        AsyncStorage.setItem(APPLE_MUSIC_PLAYLIST_TITLE, playlistName)

        dismissBottomSheet(bottomSheetRef, setPlaylistNameText, setSelectedUser)
    } else {
        console.warn(`${APPLE_ENDPOINTS.authorizeAppleUser} is not a valid URI`)
    }
}

const presentAppleAuthPrompt = (
    bottomSheetRef,
    setPlaylistNameText,
    playlistName,
    setSelectedUser
) => {
    Alert.alert(
        'Sign in with Apple Music',
        'Let Grüvee manage your playlists by linking your Apple Music account!',
        [
            {
                text: "Let's Go!",
                onPress: () =>
                    openAppleAuth(
                        bottomSheetRef,
                        setPlaylistNameText,
                        playlistName,
                        setSelectedUser
                    ),
            },
            {
                text: 'Not Now',
                onPress: () =>
                    dismissBottomSheet(bottomSheetRef, setPlaylistNameText, setSelectedUser),
                style: 'cancel',
            },
        ],
        { cancelable: true }
    )

    // Mark that the alert was presented to not show again
    AsyncStorage.setItem(PRESENTED_APPLE_MUSIC_PROMPT, 'true')
}

const addPlaylistAction = async (
    addPlaylist,
    currentUser,
    members,
    playlistName,
    setPlaylistNameText,
    bottomSheetRef,
    setSelectedUser
) => {
    try {
        if (!playlistName) {
            // TODO: Stop this and show some UI to add name
            console.log('PlaylistNameValue is empty')
            return
        }

        // Create playlist object
        const playlist = new Playlist(playlistName, members, currentUser)

        // Check to see if currentUser has Apple as preferredService Provider
        if (currentUser.preferredSocialPlatform.platformName === 'apple') {
            // Check to see if we have opted to auth with Apple Music
            const value = await AsyncStorage.getItem(PRESENTED_APPLE_MUSIC_PROMPT)
            if (value === null || value === 'false') {
                // We need to present alert
                presentAppleAuthPrompt(
                    bottomSheetRef,
                    setPlaylistNameText,
                    playlistName,
                    setSelectedUser
                )
            } else {
                dismissBottomSheet(bottomSheetRef, setPlaylistNameText, setSelectedUser)
            }
        } else {
            // If other service, we just dismiss and move on
            dismissBottomSheet(bottomSheetRef, setPlaylistNameText, setSelectedUser)
        }

        // TODO: We will probably want to add some sort of loading indicator to our button
        // Run action to create playlists
        await addPlaylist(playlist)
    } catch (error) {
        console.warn(error)
    }
}

// Redux Mappers
const mapStateToProps = state => {
    return {
        currentUser: state.UserDataReducer.user,
    }
}
const mapDispatchToProps = dispatch => ({
    addPlaylist: playlist => dispatch(AddPlaylist(playlist)),
})

const ConnectedAddPlaylistBottomSheet = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPlaylistBottomSheet)
export default forwardRef((props, ref) => (
    <ConnectedAddPlaylistBottomSheet {...props} bottomSheetRef={ref} />
))
