import { Dimensions, StyleSheet, Platform } from 'react-native'

import * as StyleConstants from 'Gruvee/config/styles'
import * as NavigationConstants from 'Gruvee/config/navigation'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
/* eslint-disable consistent-return */
const getModalHeight = navigationId => {
    switch (navigationId) {
        case NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID:
            return Platform.OS === 'ios'
                ? screenHeight / 2
                : StyleConstants.ADD_PLAYLIST_MODAL_HEIGHT_ANDROID

        case NavigationConstants.ADD_SONG_MODAL_NAV_ID:
            return Platform.OS === 'ios'
                ? StyleConstants.ADD_SONG_MODAL_HEIGHT_iOS
                : StyleConstants.ADD_SONG_MODAL_HEIGHT_ANDROID
        default:
            return StyleConstants.ADD_MODAL_DEFAULT_HEIGHT
    }
}

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
    Modal: navigationId => ({
        // position: 'absolute',
        width: screenWidth,
        height: getModalHeight(navigationId),
        // This is to center the modal absolutely in the background view
        // top: '50%',
        // left: '50%',
        // transform: [
        //     {
        //         translateX: -(screenWidth * 0.9) / 2,
        //     },
        //     {
        //         translateY: -(getModalHeight(navigationId) / 2),
        //     },
        // ],
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
    }),
    Header: {
        fontSize: StyleConstants.MODAL_HEADER_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        paddingTop: 25,
        paddingBottom: 25,
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
