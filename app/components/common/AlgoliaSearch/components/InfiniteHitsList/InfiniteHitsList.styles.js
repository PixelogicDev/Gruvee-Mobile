import { StyleSheet } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'

const itemContainerHeight = 44

export default StyleSheet.create({
    ListContainer: {
        height: itemContainerHeight * 5,
    },
    HitItemContainer: {
        flexDirection: 'row',
        width: '100%',
        height: itemContainerHeight,
        alignItems: 'center',
    },
    HitItemImage: {
        width: 28,
        height: 28,
        marginLeft: 10,
        borderRadius: 14,
        backgroundColor: 'grey',
    },
    HitItemUsername: {
        fontSize: 12,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: 'white',
        marginLeft: 10,
    },
    HitItemAddButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginLeft: 'auto',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#FFA440',
        backgroundColor: '#363636',
        justifyContent: 'center',
        alignItems: 'center',
    },
    HitItemPlusIcon: {
        width: 10,
        height: 10,
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
    InputPlaceHolderColor: {
        color: StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR,
    },
})
