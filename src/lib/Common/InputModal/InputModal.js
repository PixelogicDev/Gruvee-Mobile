import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import styles from './InputModal.styles'
import * as NavigationConstants from 'lib/Helpers/NavigationConstants'

const InputModal = ({ title, children }) => {
    const generateInputModal = (
        <View style={styles.Modal}>
            <Text style={styles.Header}>{title}</Text>
            <View style={styles.InputContainer}>
                {children}
                {/* <TextInput
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
                /> */}
            </View>
            {/* <AddPlaylistButton
                name={playlistNameValue}
                members={membersNameValue}
                createAction={createPlaylistAction}
                disabled={!playlistNameValue}
            /> */}
        </View>
    )

    const dismissOverlayAction = () => {
        Navigation.dismissOverlay(NavigationConstants.ADD_SONG_MODAL_NAV_ID)
    }
    return (
        <>
            <View
                onStartShouldSetResponder={() => dismissOverlayAction()}
                style={styles.Backdrop}
            />
            {generateInputModal}
        </>
    )
}

export default InputModal
