import React, { useState } from 'react'
import { TextInput } from 'react-native'
import styles from './DynamicTextInput.style'
import {
    INPUT_PLACEHOLDER_FONT_COLOR,
    TEXT_INPUT_PADDING,
} from '@StyleConstants'

const DynamicTextInput = () => {
    const [comment, setComment] = useState('')
    const [textInputHeight, setTextInputHeight] = useState(44)

    return (
        <TextInput
            placeholder="Add comment..."
            placeholderTextColor={INPUT_PLACEHOLDER_FONT_COLOR}
            // eslint-disable-next-line react/jsx-boolean-value
            multiline={true}
            onChangeText={text => setComment(text)}
            onContentSizeChange={event => {
                setTextInputHeight(
                    event.nativeEvent.contentSize.height + TEXT_INPUT_PADDING
                )
            }}
            style={styles.Input(textInputHeight)}
            value={comment}
        />
    )
}

export default DynamicTextInput
