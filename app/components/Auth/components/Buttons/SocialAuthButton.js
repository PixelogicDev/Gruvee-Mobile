import * as StyleConstants from '@StyleConstants'
import React, { memo } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/*
    ButtonID/Buttom ie: spotify, youtube, soundcloud
    Can use id for glyph lookup
    Can also set computed title ie: 'Log In With {FriendlyName}'
    Pass in flag to center button

    id: string (social name) ie: 'spotify'
    centerButton: bool
*/
// sillyonly - "#collection views are amazing until you implement your own layout!" (03/04/20)
const SocialAuthButton = ({ platform, platformSignInAction }) => {
    const startAuthAction = async () => {
        try {
            // Run platform specific auth flow
            platformSignInAction()
        } catch (error) {
            console.warn(error)
        }
    }

    let loginText = `Log In With ${platform.friendlyName}`
    if (platform.friendlyName.toLowerCase() === 'apple') {
        loginText = `Sign In With ${platform.friendlyName}`
    }

    return (
        <TouchableOpacity onPress={startAuthAction} style={styles.Button(platform)}>
            <Image style={styles.ButtonIcon(platform)} source={platform.glyphPath ?? null} />
            <Text
                accessibilityLabel={`${platform.friendlyName} login button`}
                style={styles.ButtonText(platform)}
            >
                {loginText}
            </Text>
        </TouchableOpacity>
    )
}

// -- MAD PROPZ rawrsatbeards - CSS MASTER --//
// Styles
const styles = StyleSheet.create({
    Button: platform => ({
        flexBasis: 44,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 280,
        width: '70%',
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        backgroundColor: platform.color.primary,
    }),
    ButtonText: platform => ({
        flexBasis: 140, // We set this so that it doesnt "cut out long text like spotify"
        color: platform.color.secondary,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
    }),
    ButtonIcon: platform => ({
        width: platform.size.width,
        height: platform.size.height,
        marginRight: 10,
        resizeMode: 'contain',
    }),
})

export default memo(SocialAuthButton)
