import React from 'react'
import { View, StyleSheet } from 'react-native'

import DynamicTextInput from 'Gruvee/Components/Common/DynamicTextInput'
import AddItemButton from 'Gruvee/Components/Common/AddItemButton'

import * as StyleConstants from '@StyleConstants'

const AddCommentTextInput = ({ style }) => {
    // Actions
    const addCommentAction = () => {
        console.log('HI IM ADDING AN ACTION.')
    }

    return (
        <View style={styles.Container(style.height)}>
            <DynamicTextInput style={{ width: '85%' }} />
            <AddItemButton
                style={styles.Button}
                addItemAction={addCommentAction}
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
