import { StyleSheet } from 'react-native'

import * as StyleConstants from 'Gruvee/config/styles'

export default StyleSheet.create({
    Input: (textInputHeight, width) => ({
        width,
        height: Math.max(44, textInputHeight),
        maxHeight: 100,
        textAlignVertical: 'center',
        padding: StyleConstants.TEXT_INPUT_PADDING,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        backgroundColor: StyleConstants.TEXT_INPUT_BG_COLOR,
        color: '#FFFFFF',
    }),
    ContentContainer: {
        top: 0,
    },
})
