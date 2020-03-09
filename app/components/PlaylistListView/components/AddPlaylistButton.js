import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'

const AddPlaylistButton = ({ createAction, disabled }) => {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={createAction}
                style={styles.Button(disabled)}
                disabled={disabled}
            >
                <Text
                    accessibilityLabel="Add playlist create button"
                    style={styles.ButtonText(disabled)}
                >
                    Create
                </Text>
            </TouchableOpacity>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    Button: disabled => ({
        flexBasis: 44,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        borderWidth: 1,
        borderColor: disabled
            ? StyleConstants.ADD_PLAYLIST_BUTTON_DISABLED_BORDER_COLOR
            : StyleConstants.ADD_PLAYLIST_BUTTON_BORDER_COLOR,
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
    }),
    ButtonText: disabled => ({
        width: '100%',
        textAlign: 'center',
        color: disabled
            ? StyleConstants.INPUT_BORDER_BOTTOM_COLOR
            : StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
    }),
})

export default AddPlaylistButton
