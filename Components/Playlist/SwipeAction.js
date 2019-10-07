import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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

const SwipeAction = ({
    action,
    actionColor,
    iconName,
    name,
    width,
    height,
}) => {
    return (
        <TouchableOpacity
            style={styles.Background(actionColor)}
            onPress={action}
        >
            <Image
                accessibilityRole="image"
                accessibilityLabel={name}
                source={{ uri: `${iconName}` }}
                style={styles.Icon(width, height)}
            />
        </TouchableOpacity>
    )
}

export default SwipeAction
