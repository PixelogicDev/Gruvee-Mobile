import { StyleSheet } from 'react-native'

import * as StyleConstants from '@StyleConstants'

export default StyleSheet.create({
    Input: textInputHeight => ({
        textAlignVertical: 'center',
        height: Math.max(44, textInputHeight),
        maxHeight: 100,
        margin: StyleConstants.TABLE_CONTAINER_CONTENT_SPACING,
        paddingTop: StyleConstants.TEXT_INPUT_PADDING,
        padding: StyleConstants.TEXT_INPUT_PADDING,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        backgroundColor: StyleConstants.TEXT_INPUT_BG_COLOR,
        color: '#FFFFFF',
    }),
})
