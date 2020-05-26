import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SEMIBOLD_WEIGHT } from '@StyleConstants'

// Stlyes
const styles = StyleSheet.create({
    Available: {
        color: '#C3EF87',
        fontSize: 12,
        fontWeight: SEMIBOLD_WEIGHT,
    },
    Unavailable: {
        color: '#FEAF68',
        fontSize: 12,
        fontWeight: SEMIBOLD_WEIGHT,
    },
})

const ValidUsername = ({ containerStyle, username, usernameAvailable }) => {
    const availableMessage = `👍 ${username} is available!`
    const unavailableMessage = `☹️ ${username} has already been snagged.`

    return (
        (username.length && (
            <View style={containerStyle}>
                <Text style={usernameAvailable ? styles.Available : styles.Unavailable}>
                    {usernameAvailable ? availableMessage : unavailableMessage}
                </Text>
            </View>
        )) ||
        null
    )
}

export default ValidUsername
