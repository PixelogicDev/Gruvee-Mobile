import React, { useRef, useState, useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import styles from './AnimatedSwipeRow.styles'

const AnimatedSwipeRow = ({
    openValue = -75,
    isRightOpenValue,
    itemHeight,
    swipeActionComponent,
    listItemComponent,
    isLastItem,
    swipeActionCallback,
    swipeTriggered,
}) => {
    const swipeRef = useRef(null)
    const [swipeActionRunning, setIsSwipeActionRunning] = useState(false)
    const [shrinkHeight] = useState(new Animated.Value(itemHeight))

    const runSwipeAction = () => {
        if (swipeRef.current && swipeRef.current.manuallySwipeRow) {
            setIsSwipeActionRunning(true)
            swipeRef.current.manuallySwipeRow(
                -Math.round(Dimensions.get('window').width),
                () => isLastItem && swipeActionCallback()
            )
            if (!isLastItem) {
                Animated.timing(shrinkHeight, {
                    toValue: 0,
                    duration: 250,
                }).start(swipeActionCallback)
            }
        }
    }

    useEffect(() => {
        if (swipeTriggered) runSwipeAction()
    }, [swipeTriggered])

    return (
        <SwipeRow
            rightOpenValue={isRightOpenValue ? openValue : 0}
            leftOpenValue={isRightOpenValue ? 0 : openValue}
            ref={swipeRef}
            style={styles.SwipeRow(itemHeight)}
        >
            <Animated.View style={styles.SwipeContainer(swipeActionRunning, shrinkHeight)}>
                {swipeActionComponent}
            </Animated.View>
            <Animated.View style={styles.AnimatedContainer(shrinkHeight)}>
                {listItemComponent}
            </Animated.View>
        </SwipeRow>
    )
}

export default AnimatedSwipeRow
