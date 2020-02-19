import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import InputModal from 'Gruvee/Components/Common/InputModal'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'

const AddSongModal = ({ title, addSongAction }) => {
    const [songLink, setSongLink] = useState('')
    const [songComment, setSongComment] = useState('')

    return (
        <InputModal
            title={title}
            buttonTitle="Add"
            createAction={() => {
                addSongAction(songLink, songComment)
            }}
            buttonDisabled={!songLink}
            navigationId={NavigationConstants.ADD_SONG_MODAL_NAV_ID}
        >
            <TextInput
                placeholder="Song link"
                placeholderTextColor={
                    StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                }
                style={styles.SongLinkInput}
                onChangeText={text => setSongLink(text)}
                value={songLink}
            />
            <TextInput
                placeholder="This song is..."
                placeholderTextColor={
                    StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                }
                multiline
                editable
                style={styles.SongCommentInput}
                maxLength={280}
                onChangeText={text => setSongComment(text)}
                value={songComment}
            />
        </InputModal>
    )
}

const styles = StyleSheet.create({
    SongLinkInput: {
        width: '75%',
        marginBottom: 15,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderBottomColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderBottomWidth: 0.5,
    },
    SongCommentInput: {
        width: '75%',
        height: 100,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderWidth: 0.5,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        padding: StyleConstants.TEXT_INPUT_PADDING,
        textAlignVertical: 'top',
    },
})

export default AddSongModal
