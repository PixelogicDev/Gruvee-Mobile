import { StyleSheet } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'

export default StyleSheet.create({
    Input: {
        width: '75%',
        marginBottom: 15,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderBottomColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderBottomWidth: 0.5,
    },
    InputPlaceHolderColor: {
        color: StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR,
    },
})
