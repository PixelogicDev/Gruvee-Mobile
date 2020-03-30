import { StyleSheet } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'

export default StyleSheet.create({
    Input: {
        width: '100%',
        height: 44,
        padding: StyleConstants.TEXT_INPUT_PADDING,
        borderRadius: 5,
        backgroundColor: '#424242',
        color: 'white',
        fontSize: 12,
    },
    InputPlaceHolderColor: {
        color: StyleConstants.BASE_FONT_COLOR,
    },
})
