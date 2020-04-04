import { StyleSheet } from 'react-native'
import { SEMIBOLD_WEIGHT } from '@StyleConstants'

export default StyleSheet.create({
    Container: {
        height: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    Highlighted: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 3,
    },
    Item: {
        alignSelf: 'center',
        color: '#FFA440',
        fontSize: 12,
        fontWeight: SEMIBOLD_WEIGHT,
        paddingHorizontal: 3,
    },
})
