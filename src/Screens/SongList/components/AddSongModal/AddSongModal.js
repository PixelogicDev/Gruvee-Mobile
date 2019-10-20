import React, { useState, useEffect } from 'react'
import {
    BackHandler,
    View,
    StyleSheet,
    Platform,
    TextInput,
} from 'react-native'

import InputModal from 'Gruvee/src/Screens/Common/InputModal'
import * as StyleConstants from 'lib/Helpers/StyleConstants'

const AddSongModal = ({ title }) => {
    return (
        <InputModal title={title}>
            <TextInput
                placeholder="Song link"
                placeholderTextColor={
                    StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                }
                style={styles.SongLinkInput}
                // onChangeText={text => setSongLink(text)}
                // value={songLink}
            />
            <TextInput
                placeholder="This song was p o p p i n...."
                placeholderTextColor={
                    StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                }
                multiline
                editable
                style={styles.SongCommentInput}
                maxLength={280}
                // onChangeText={text => setSongComment(text)}
                // value={songComment}
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
        padding: 8,
    },
})

export default AddSongModal
