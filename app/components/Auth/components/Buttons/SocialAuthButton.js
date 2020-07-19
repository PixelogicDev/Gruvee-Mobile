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

    return (
        <TouchableOpacity onPress={startAuthAction} style={styles.Button(platform)}>
            <View style={styles.ButtonIconContainer}>
                <Image style={styles.ButtonIcon(platform)} source={platform.glyphPath ?? null} />
            </View>
            <Text
                accessibilityLabel={`${platform.friendlyName} login button`}
                style={styles.ButtonText(platform)}
            >
                {`Sign in with ${platform.friendlyName}`}
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
        minWidth: 280,
        width: '70%',
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        backgroundColor: platform.color.primary,
        flexDirection: 'row',
        overflow: 'hidden',
    }),
    ButtonText: platform => ({
        minWidth: 140, // We set this so that it doesnt "cut out long text like spotify"
        flexWrap: 'wrap',
        color: platform.color.secondary,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
        alignSelf: 'center',
        flexGrow: 1,
    }),
    ButtonIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 44,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        paddingLeft: 5,
        marginRight: 25,
    },
    ButtonIcon: platform => ({
        width: platform.size.width,
        height: platform.size.height,
        alignSelf: 'center',
        resizeMode: 'contain',
    }),
})

export default memo(SocialAuthButton)
