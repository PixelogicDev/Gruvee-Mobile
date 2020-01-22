import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    AnimatedContainer: height => ({
        height,
        marginBottom: 20,
    }),
    SwipeContainer: (isDeleting, height) => ({
        justifyContent: 'center',
        alignItems: 'flex-end',
        height,
        opacity: isDeleting ? 0 : 1,
    }),
    SwipeRow: height => ({
        height,
        marginBottom: 10,
    }),
    Wrapper: height => ({
        height,
    }),
})
