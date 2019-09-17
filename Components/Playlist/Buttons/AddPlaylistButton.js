import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

import * as StyleConstants from '../../../StyleConstants'
import * as NavigationConstants from '../../../NavigationConstants'

const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    Button: {
        flexBasis: 44,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        borderWidth: 1,
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
    },
    ButtonText: {
        width: '100%',
        textAlign: 'center',
        color: StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
    },
})

const AddPlaylistButton = props => {
    const createPlaylistAction = () => {
        // Dismiss and reload table
        Navigation.dismissOverlay(NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID)
    }

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={createPlaylistAction}
                style={styles.Button}
            >
                <Text
                    accessibilityLabel={'Add playlist create button'}
                    style={styles.ButtonText}
                >
                    Create
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPlaylistButton
