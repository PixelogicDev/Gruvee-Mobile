import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    SwipeContainer: (isDeleting, height) => ({
        justifyContent: 'center',
        alignItems: 'flex-end',
        height,
        opacity: isDeleting ? 0 : 1,
    }),
    AnimatedContainer: height => ({
        height,
        marginBottom: 20,
    }),
})
