// MrDemonWolf - "A Furry was here" (02/17/20)
// BackeyM - "I don't like furrys" (02/17/20)
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { Linking, Text, View, StyleSheet } from 'react-native'
import * as StyleConstants from '@StyleConstants'

// Firebase
import { firebase } from '@react-native-firebase/auth'

// Auth Platform Specific Imports
import appleAuth from '@invertase/react-native-apple-authentication'
import { HandleSpotifyAuth } from './Actions/SpotifyActions'

import SocialButtons from './Buttons'

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = () => {
    const [userState, setUserState] = useState()

    useEffect(() => {
        // Firebae Authentication Handler
        const authStatus = firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                // This currently is being set on the component state
                // We will probably need to see what is being returned here and how to set on userState
                setUserState(user)
            }
        })

        // Deep Link Handler
        Linking.addEventListener('url', handleOpenUrl)

        // Apple Authentication Handler
        /* if (appleAuth.isSupported) {
            // If creds are revoked we probably want to some new stuff here
            return appleAuth.onCredentialRevoked(async () => {
                console.warn(
                    'If this function executes, User Credentials have been Revoked'
                )
            })
        } */

        return () => {
            // Do cleanup here
            authStatus()
            Linking.removeEventListener('url')
        }
    }, [])

    return (
        <View style={styles.Container}>
            <View>
                <Text style={styles.SectionTitle}>Let's Get Grüvee</Text>
                <Text style={styles.SectionDetail}>
                    Let all of your wildest memes come true. Just sell your soul
                    below.
                </Text>
            </View>
            <View style={styles.ButtonContainer}>{SocialButtons}</View>
        </View>
    )
}

// Helpers
const handleOpenUrl = event => {
    // Check to see what platform this is coming from
    if (event.url.includes('spotify_auth')) {
        HandleSpotifyAuth(event.url)
    }
}

// Styles
const styles = StyleSheet.create({
    ButtonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '20%',
    },
    Container: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        paddingTop: 100,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
    },
    SectionTitle: {
        fontSize: StyleConstants.LARGE_TITLE_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    SectionDetail: {
        marginTop: 25,
        fontSize: StyleConstants.HEADLINE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
})

// sillyonly "110 to Get this! I DEMAND A DISCOUNT SINCE I AM A LOYAL CUSTOMER" (02/17/20)
export default Auth
