// Isakfk1234 - "HTML is the best programming language kappa" (03/30/20)
import { StyleSheet } from 'react-native'

import * as StyleConstants from 'Gruvee/config/styles'

export default StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
    },
    Button: disabled => ({
        flexBasis: 44,
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        marginBottom: 15,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        borderWidth: 1,
        borderColor: disabled
            ? StyleConstants.ADD_PLAYLIST_BUTTON_DISABLED_BORDER_COLOR
            : StyleConstants.ADD_PLAYLIST_BUTTON_BORDER_COLOR,
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
    }),
    ButtonText: disabled => ({
        width: '100%',
        textAlign: 'center',
        color: disabled ? StyleConstants.INPUT_BORDER_BOTTOM_COLOR : StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
    }),
})
