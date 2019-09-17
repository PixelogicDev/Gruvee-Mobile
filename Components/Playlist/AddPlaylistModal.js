import React from 'react'
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native'

import * as StyleConstants from '../../StyleConstants'
import AddPlaylistButton from './Buttons/AddPlaylistButton'

const styles = StyleSheet.create({
    Backdrop: {
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
        opacity: 1.0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Modal: {
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
        width: '85%',
        height: 200,
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
        paddingTop: 20,
    },
    Input: {
        width: '75%',
        marginBottom: 25,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderBottomColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderBottomWidth: 0.5,
    },
})

const AddPlaylistModal = () => {
    const [playlistNameValue, onChangePlaylistNameText] = React.useState('')
    const [membersNameValue, onChangeMembersNameText] = React.useState('')

    return (
        // Backdrop view
        <View style={styles.Backdrop}>
            {/* Modal View */}
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
                    ></TextInput>
                    <TextInput
                        placeholder="Members"
                        placeholderTextColor={
                            StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                        }
                        style={styles.Input}
                        onChangeText={text => onChangeMembersNameText(text)}
                        value={membersNameValue}
                    ></TextInput>
                </View>
                <AddPlaylistButton></AddPlaylistButton>
            </View>
        </View>
    )
}

export default AddPlaylistModal
