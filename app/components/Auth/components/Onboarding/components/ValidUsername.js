// 404_mr_robot: "Its my b-day today! What better way to start the morning? - Meharban Singh" - (05/27/20)
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

const ValidUsername = ({ containerStyle, isTyping, username, usernameAvailable }) => {
    const getTextContent = () => {
        const availableMessage = `👍 ${username} is available!`
        const unavailableMessage = `☹️ ${username} has already been snagged.`
        const usernameLengthMessage = `📏 Your username must be at least 3 characters.`

        if (username.length && !isTyping) {
            if (username.length < 3) {
                return usernameLengthMessage
            }

            return usernameAvailable ? availableMessage : unavailableMessage
        }

        return ''
    }

    return (
        <View style={containerStyle}>
            <Text style={usernameAvailable ? styles.Available : styles.Unavailable}>
                {getTextContent()}
            </Text>
        </View>
    )
}

export default ValidUsername
