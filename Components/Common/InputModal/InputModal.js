import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import CreateItemActionButton from 'Gruvee/Components/Common/CreateItemActionButton'
import styles from './InputModal.styles'
import * as NavigationConstants from '@NavigationConstants'

const InputModal = ({
    title,
    buttonTitle,
    children,
    createAction,
    buttonDisabled,
}) => {
    const generateInputModal = (
        <View style={styles.Modal}>
            <Text style={styles.Header}>{title}</Text>
            <View style={styles.InputContainer}>{children}</View>
            <CreateItemActionButton
                title={buttonTitle}
                createAction={createAction}
                disabled={buttonDisabled}
            />
        </View>
    )

    // TODO: Need to change this to accomodate for playlist modal as well
    const dismissOverlayAction = () => {
        Navigation.dismissOverlay(NavigationConstants.ADD_SONG_MODAL_NAV_ID)
    }
    return (
        <>
            <View
                onStartShouldSetResponder={() => dismissOverlayAction()}
                style={styles.Backdrop}
            />
            {generateInputModal}
        </>
    )
}

export default InputModal
