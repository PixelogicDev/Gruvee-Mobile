import React, { forwardRef, useState } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

// Redux
import { connect } from 'react-redux'
import { AddSong } from 'Gruvee/redux/actions/songs/SongsActions'

import { GetMediaData } from 'Gruvee/service/common/endpoints'
import BottomSheet from 'reanimated-bottom-sheet'
import CreateItemActionButton from 'Gruvee/components/common/CreateItemActionButton'
import { ParseMediaLink } from 'Gruvee/helpers/SongRegexHelper'
import * as StyleConstants from '@StyleConstants'
import Song from 'Gruvee/lib/Song'

const screenHeight = Dimensions.get('screen').height
const navBarHeight = Platform.OS === 'ios' ? 80 : 84
const timesIcon = require('Gruvee/assets/icons/times/times_icon.png')

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

const AddSongBottomSheet = ({
    currentUser,
    addSong,
    currentPlaylistId,
    currentPlaylist,
    bottomSheetRef,
}) => {
    const [songLink, setSongLink] = useState('')
    const [songComment, setSongComment] = useState('')

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[screenHeight - navBarHeight, screenHeight / 2 + navBarHeight, 0]}
            borderRadius={10}
            initialSnap={2}
            renderContent={generateSheetContent(
                songLink,
                setSongLink,
                songComment,
                setSongComment,
                bottomSheetRef,
                currentUser,
                addSong,
                currentPlaylistId,
                currentPlaylist
            )}
        />
    )
}

// Actions
const addSongAction = (
    currentUser,
    mediaLink,
    comment,
    addSong,
    currentPlaylistId,
    currentPlaylist,
    dismissBottomSheetAction
) => async () => {
    try {
        // Parse link
        const linkMetadata = ParseMediaLink(mediaLink)

        // Check if song exists in playlist already
        if (currentPlaylist.songs.allSongs.includes(linkMetadata.mediaId)) {
            showAlert('Looks like this already exists in your playlist')
            return
        }

        // Get songLink and run metadata check to get the proper Song Object
        const mediaMetadata = await GetMediaData(linkMetadata)

        // Create song object
        const song = new Song(mediaMetadata.data)

        // Call redux action
        addSong(currentUser, currentPlaylistId, song, comment)

        // When song is added to collection, service should trigger function to get data for other platforms

        // TODO: Run any comment creation logic here
        dismissBottomSheetAction()
    } catch (error) {
        console.warn(error)
    }
}

const clearInputs = (setSongLink, setSongComment) => {
    // Clear song link
    setSongLink('')

    // Clear comment
    setSongComment('')
}

const dismissBottomSheet = (setSongLink, setSongComment, bottomSheetRef) => {
    // Dismiss - We will need to dismiss our card
    if (bottomSheetRef.current) {
        // TODO: To fix current issue with dismissing card, call this thing twice
        bottomSheetRef.current.snapTo(2)
        bottomSheetRef.current.snapTo(2)
    }

    // Clear playlist name
    clearInputs(setSongLink, setSongComment)
}

const showAlert = message => {
    Alert.alert('Uh-Oh! 🤭', message)
}

const generateSheetContent = (
    songLink,
    setSongLink,
    songComment,
    setSongComment,
    bottomSheetRef,
    currentUser,
    addSong,
    currentPlaylistId,
    currentPlaylist
) => () => {
    const dismissBottomSheetAction = () => {
        dismissBottomSheet(setSongLink, setSongComment, bottomSheetRef)
    }

    return (
        <View style={styles.InputContainer}>
            <TouchableOpacity
                style={styles.CloseButtonContainer}
                onPress={dismissBottomSheetAction}
            >
                <Image style={styles.CloseButtonIcon} source={timesIcon ?? null} />
            </TouchableOpacity>
            <Text style={styles.Header}>Add Song</Text>
            <TextInput
                placeholder="Song link"
                placeholderTextColor={StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR}
                style={styles.Input}
                onChangeText={text => setSongLink(text)}
                value={songLink}
            />
            <TextInput
                placeholder="Comment"
                placeholderTextColor={StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR}
                multiline
                editable
                style={styles.Input}
                maxLength={280}
                onChangeText={text => setSongComment(text)}
                value={songComment}
            />
            <CreateItemActionButton
                title="Add"
                createAction={addSongAction(
                    currentUser,
                    songLink,
                    songComment,
                    addSong,
                    currentPlaylistId,
                    currentPlaylist,
                    dismissBottomSheetAction
                )}
                disabled={!songLink}
            />
        </View>
    )
}

const mapStateToProps = state => {
    return {
        currentPlaylist:
            state.PlaylistsDataReducer.playlists.byId[state.PlaylistsDataReducer.currentPlaylistId],
        currentPlaylistId: state.PlaylistsDataReducer.currentPlaylistId,
        currentUser: state.UserDataReducer.user,
    }
}

const mapDispatchToProps = dispatch => ({
    addSong: (playlistId, song, comment) => dispatch(AddSong(playlistId, song, comment)),
})

const ConnectedAddSongBottomSheet = connect(mapStateToProps, mapDispatchToProps)(AddSongBottomSheet)
export default forwardRef((props, ref) => (
    <ConnectedAddSongBottomSheet {...props} bottomSheetRef={ref} />
))
