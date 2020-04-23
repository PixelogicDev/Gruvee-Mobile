import React, { useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import DynamicTextInput from 'Gruvee/components/common/DynamicTextInput'
import AddItemButton from 'Gruvee/components/common/AddItemButton'

import * as StyleConstants from 'Gruvee/config/styles'

const AddCommentTextInput = ({ style, addCommentAction, scrollToBottomAction }) => {
    const [comment, setComment] = useState('')

    // Actions
    const submitCommentAction = () => {
        addCommentAction(comment)

        // Update text input to be empty
        setComment('')

        // Dismiss keyboard
        Keyboard.dismiss()

        // Scroll to bottom of table
        scrollToBottomAction()
    }

    return (
        <View style={styles.Container(style.height)}>
            <DynamicTextInput
                placeholderText="Add comment..."
                style={{ width: '85%' }}
                value={comment}
                onChangeText={setComment}
            />
            <AddItemButton
                style={styles.Button}
                addItemAction={() => {
                    submitCommentAction()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: height => ({
        margin: StyleConstants.TABLE_CONTAINER_CONTENT_SPACING,
        flexDirection: 'row',
        height,
    }),
    Button: {
        width: StyleConstants.ADD_BUTTON_COMMENT_SIZE,
        height: StyleConstants.ADD_BUTTON_COMMENT_SIZE,
        marginLeft: 15,
    },
})

export default AddCommentTextInput
