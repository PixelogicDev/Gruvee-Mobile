import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './CreateItemActionButton.style'

const CreateItemActionButton = ({ title, disabled, createAction }) => {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={createAction}
                style={styles.Button(disabled)}
                disabled={disabled}
            >
                <Text
                    accessibilityLabel="Create Item Action Button"
                    style={styles.ButtonText(disabled)}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateItemActionButton
