import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as NavigationConstants from '@NavigationConstants'
import * as StyleConstants from '@StyleConstants'

/*
    ButtonID/Buttom ie: spotify, youtube, soundcloud
    Can use id for glyph lookup
    Can also set computed title ie: 'Log In With {FriendlyName}'
    Pass in flag to center button

    id: string (social name) ie: 'spotify'
    centerButton: bool
*/
const SocialAuthButton = ({ platform }) => {
    const navigateToPlaylists = () => {
        Navigation.push(NavigationConstants.STACK_ID, {
            component: {
                name: NavigationConstants.PLAYLIST_NAV_NAME,
                options: {
                    topBar: {
                        title: {
                            text: 'Playlists',
                        },
                    },
                },
            },
        })
    }
    
    let loginText = "Log In With ${platform.friendlyName}"
    if (platform.friendlyName.toLowerCase() === 'apple') {
        loginText = "Sign In With ${platform.friendlyName}"
    }
    
    return (
        <TouchableOpacity
            onPress={navigateToPlaylists}
            style={styles.Button(platform)}
        >
            <Image
                style={styles.ButtonIcon(platform)}
                source={platform.glyphPath}
            />
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

export default SocialAuthButton
