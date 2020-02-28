import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import CreateItemActionButton from 'Gruvee/components/common/CreateItemActionButton'
import styles from './InputModal.styles'

const InputModal = ({
    title,
    buttonTitle,
    children,
    createAction,
    buttonDisabled,
    navigationId,
}) => {
    const generateInputModal = (
        <View style={styles.Modal(navigationId)}>
            <Text style={styles.Header}>{title}</Text>
            <View style={styles.InputContainer}>{children}</View>
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
                onStartShouldSetResponder={() =>
                    Navigation.dismissOverlay(navigationId)
                }
                style={styles.Backdrop}
            />
            {generateInputModal}
        </>
    )
}

export default InputModal
