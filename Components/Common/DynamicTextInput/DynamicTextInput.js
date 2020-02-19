import React, { useState } from 'react'
import { TextInput } from 'react-native'
import styles from './DynamicTextInput.style'
import {
    INPUT_PLACEHOLDER_FONT_COLOR,
    TEXT_INPUT_PADDING,
} from '@StyleConstants'

const DynamicTextInput = ({ style, value, onChangeText, placeholderText }) => {
    const [textInputHeight, setTextInputHeight] = useState(44)

    return (
        <TextInput
            // TODO: NEED TO PASS THIS IN
            placeholder={placeholderText}
            placeholderTextColor={INPUT_PLACEHOLDER_FONT_COLOR}
            // eslint-disable-next-line react/jsx-boolean-value
            multiline={true}
            onChangeText={text => onChangeText(text)}
            onContentSizeChange={event => {
                setTextInputHeight(
                    event.nativeEvent.contentSize.height + TEXT_INPUT_PADDING
                )
            }}
            style={styles.Input(textInputHeight, style.width)}
            value={value}
        />
    )
}

export default DynamicTextInput
