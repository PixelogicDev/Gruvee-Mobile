import { StyleSheet } from 'react-native'
import { BASE_FONT_COLOR } from '@StyleConstants'

export default StyleSheet.create({
    Container: {
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 5,
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#424242',
    },
    Input: {
        flexGrow: 1,
        color: 'white',
        fontSize: 12,
        paddingLeft: 5,
    },
    InputPlaceHolderColor: {
        color: BASE_FONT_COLOR,
    },
})
