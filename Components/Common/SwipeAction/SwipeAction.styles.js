import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    Background: actionColor => ({
        backgroundColor: actionColor,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    Icon: (width, height) => ({
        width,
        height,
    }),
})
