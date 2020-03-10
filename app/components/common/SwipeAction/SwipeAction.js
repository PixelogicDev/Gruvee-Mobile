import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './SwipeAction.styles'

const SwipeAction = ({ action, actionColor, icon, name, width, height }) => {
    return (
        <TouchableOpacity style={styles.Background(actionColor)} onPress={action}>
            <Image
                accessibilityRole="image"
                accessibilityLabel={name}
                source={icon}
                style={styles.Icon(width, height)}
            />
        </TouchableOpacity>
    )
}

export default SwipeAction
