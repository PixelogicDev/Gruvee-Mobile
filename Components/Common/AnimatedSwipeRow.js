import React, { useRef, useState } from 'react'
import {
    Animated,
    Dimensions,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import * as StyleConstants from '../../StyleConstants'

const styles = StyleSheet.create({
    SwipeContainer: (isDeleting, height) => ({
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: height,
        opacity: isDeleting ? 0 : 1,
    }),
    AnimatedContainer: height => ({
        height: height,
        marginBottom: 20,
    }),
})

// openValue: Int - amount of open value for cell
// isRightOpenValue: Bool - determine if open value should be for the left or right
// itemHeight: Int - the height of the listItemComponent cell
// swipeActionComponent: Object - component being rendered behind the main list item
// listItemComponent: Object - component being rendered as the main item in the list
const AnimatedSwipeRow = ({
    openValue,
    isRightOpenValue,
    itemHeight,
    swipeActionComponent,
    listItemComponent,
}) => {
    const swipeRef = useRef(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [shrinkHeight, setShrinkHeight] = useState(
        new Animated.Value(itemHeight)
    )

    return (
        <SwipeRow
            rightOpenValue={isRightOpenValue ? openValue : 0}
            leftOpenValue={isRightOpenValue ? 0 : openValue}
            ref={swipeRef}
        >
            <Animated.View
                style={styles.SwipeContainer(isDeleting, shrinkHeight)}
            >
                {swipeActionComponent}
            </Animated.View>
            <Animated.View style={styles.AnimatedContainer(shrinkHeight)}>
                {listItemComponent}
            </Animated.View>
        </SwipeRow>
    )
}

export default AnimatedSwipeRow
