// syszen - "note: nokia 3310 - the most indestructible phone ever, this app will be release on it at 2021" (04/03/20)
import React, { forwardRef, useState } from 'react'
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import AlgoliaSearch from 'Gruvee/components/common/AlgoliaSearch'
import CreateItemActionButton from 'Gruvee/components/common/CreateItemActionButton'
import Playlist from 'Gruvee/lib/Playlist'

// Redux
import { connect } from 'react-redux'
import { AddPlaylist } from 'Gruvee/redux/actions/playlists/PlaylistActions'

import * as StyleConstants from '@StyleConstants'

const screenHeight = Dimensions.get('screen').height
const navBarHeight = Platform.OS === 'ios' ? 44 : 36
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

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[screenHeight / 2 + navBarHeight, 0]}
            borderRadius={10}
            initialSnap={1}
            renderContent={() =>
                generateSheetContent(
                    addPlaylist,
                    currentUser,
                    setPlaylistNameText,
                    playlistNameText,
                    runPlaylistAction,
                    bottomSheetRef
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
    bottomSheetRef
) => (
    <View style={styles.InputContainer}>
        <TouchableOpacity
            style={styles.CloseButtonContainer}
            onPress={() => {
                dismissBottomSheet(bottomSheetRef, setPlaylistNameText)
            }}
        >
            <Image style={styles.CloseButtonIcon} source={timeIcon} />
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
            <AlgoliaSearch attribute="username" />
            <CreateItemActionButton
                title="Add"
                createAction={() => {
                    addPlaylistAction(
                        addPlaylist,
                        currentUser,
                        [], // This will be our list of member ids
                        playlistNameText,
                        bottomSheetRef
                    )
                    setPlaylistNameText('')
                }}
                disabled={!playlistNameText}
            />
        </View>
    </View>
)

// Actions
const dismissBottomSheet = (bottomSheetRef, setPlaylistNameText) => {
    // Dismiss - We will need to dismiss our card
    if (bottomSheetRef.current) {
        // TODO: To fix current issue with dismissing card, call this thing twice
        bottomSheetRef.current.snapTo(1)
        bottomSheetRef.current.snapTo(1)
    }

    setPlaylistNameText('')
}
const runPlaylistAction = async (
    addPlaylist,
    currentUser,
    members,
    playlistName,
    bottomSheetRef
) => {
    try {
        // Create playlist object
        const playlist = new Playlist(playlistName, members, currentUser)

        if (!playlistName) {
            // TODO: Stop this and show some UI to add name
            console.log('PlaylistNameValue is empty')
            return
        }

        dismissBottomSheet(bottomSheetRef)

        // Run action to create playlists
        await addPlaylist(playlist)

        // TODO: We will probably want to add some sort of loading indicator to our button
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
