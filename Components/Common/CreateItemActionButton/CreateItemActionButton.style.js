import { StyleSheet } from 'react-native'

import * as StyleConstants from '@StyleConstants'

export default StyleSheet.create({
    Container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    Button: disabled => ({
        flexBasis: 44,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
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
        color: disabled
            ? StyleConstants.INPUT_BORDER_BOTTOM_COLOR
            : StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
    }),
})
