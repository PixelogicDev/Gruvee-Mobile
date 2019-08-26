import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
} from 'react-native'
import * as StyleConstants from '../../StyleConstants'

/*
    ButtonID/Buttom ie: spotify, youtube, soundcloud
    Can use id for glyph lookup
    Can also set computed title ie: 'Log In With {FriendlyName}'
    Pass in flag to center button

    id: string (social name) ie: 'spotify'
    centerButton: bool
*/
const SocialAuthButton = props => {
    // Deconstruct the props
    const { platform } = props

    //-- MAD PROPZ rawrsatbeards - CSS MASTER --//
    const styles = StyleSheet.create({
        Container: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 44,
        },
        Button: {
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 280,
            width: '70%',
            borderRadius: 15,
            backgroundColor: platform.color.primary,
        },
        ButtonText: {
            color: platform.color.secondary,
            fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
            fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
        },
        Icon: {
            width: 25,
            height: 25,
            marginRight: 10,
        },
    })

    const sayHello = () => {
        console.warn('Hello.')
    }

    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={sayHello} style={styles.Button}>
                <Image
                    style={styles.Icon}
                    source={{ uri: `${platform.glyphPath}` }}
                />
                <Text
                    accessibilityLabel={`${platform.friendlyName} auth button`}
                    style={styles.ButtonText}
                >
                    Log In With {platform.friendlyName}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SocialAuthButton
