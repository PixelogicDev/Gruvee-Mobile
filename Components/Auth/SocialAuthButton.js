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
import * as NavigationConstants from '../../NavigationConstants'
import { Navigation } from 'react-native-navigation'

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
        Button: {
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
        },
        ButtonText: {
            color: platform.color.secondary,
            fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
            fontSize: StyleConstants.BUTTON_TEXT_SIZE_iOS,
        },
        ButtonIcon: {
            width: platform.size.width,
            height: platform.size.height,
            marginRight: 10,
            resizeMode: 'contain',
        },
    })

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

    return (
        <TouchableOpacity onPress={navigateToPlaylists} style={styles.Button}>
            <Image
                style={styles.ButtonIcon}
                source={{ uri: `${platform.glyphPath}` }}
            />
            <Text
                accessibilityLabel={`${platform.friendlyName} login button`}
                style={styles.ButtonText}
            >
                Log In With {platform.friendlyName}
            </Text>
        </TouchableOpacity>
    )
}

export default SocialAuthButton
