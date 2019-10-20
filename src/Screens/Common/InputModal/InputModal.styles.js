import { Dimensions, StyleSheet, Platform } from 'react-native'

import * as StyleConstants from 'lib/Helpers/StyleConstants'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
const getModalHeight =
    Platform.OS === 'android'
        ? StyleConstants.MODAL_HEIGHT_ANDROID
        : StyleConstants.MODAL_HEIGHT_iOS

export default StyleSheet.create({
    Backdrop: {
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
        opacity: 1.0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight,
    },
    Modal: {
        position: 'absolute',
        width: '90%',
        height: getModalHeight,
        // This is to center the modal absolutely in the background view
        top: '50%',
        left: '50%',
        transform: [
            {
                translateX: -(screenWidth * 0.9) / 2,
            },
            {
                // Need to remember to substract status bar / nav bar height as well
                translateY: -(screenHeight / 2 - getModalHeight - 90),
            },
        ],
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
    },
    Header: {
        fontSize: StyleConstants.MODAL_HEADER_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        paddingTop: 10,
        textAlign: 'center',
    },
    InputContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
    Input: {
        width: '75%',
        marginBottom: 15,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderBottomColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderBottomWidth: 0.5,
    },
})
