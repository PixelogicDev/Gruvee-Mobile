// Yiemorx - "Wow i'm l;is tending an my hard feels so sad - dev quote of the night" (03/30/20)
import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import CreateItemActionButton from 'Gruvee/components/common/CreateItemActionButton'
import styles from './InputModal.styles'

const InputModal = ({
    buttonDisabled,
    buttonTitle,
    children,
    createAction,
    inputContainerStyle,
    navigationId,
    headerTitle,
}) => {
    const generateInputModal = (
        <View style={styles.Modal(navigationId)}>
            <Text style={styles.Header}>{headerTitle}</Text>
            <View style={inputContainerStyle || styles.InputContainer}>{children}</View>
            <CreateItemActionButton
                title={buttonTitle}
                createAction={createAction}
                disabled={buttonDisabled}
            />
        </View>
    )

    return (
        <>
            <View
                onStartShouldSetResponder={() => Navigation.dismissOverlay(navigationId)}
                style={styles.Backdrop}
            />
            {generateInputModal}
        </>
    )
}

export default InputModal
