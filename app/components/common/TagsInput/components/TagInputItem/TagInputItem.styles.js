import { StyleSheet } from 'react-native'
import { SEMIBOLD_WEIGHT } from '@StyleConstants'

export default StyleSheet.create({
    Container: {
        padding: 5,
    },
    Highlighted: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    Item: {
        color: '#FFA440',
        fontSize: 12,
        fontWeight: SEMIBOLD_WEIGHT,
    },
})
