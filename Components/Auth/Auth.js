// MrDemonWolf - "A Furry was here" (02/17/20)
// BackeyM - "I don't like furrys" (02/17/20)
// sillyonly - "aaah some said JS or TS would be nice! but you know what! I think if you wrote it in C you would've made perfection!" (02/18/20)
// BackeyM - "pee pee poo poo" (02/18/20)
// dra031cko - "android > ios" (02/19/20)
// sillyonly - "SOOOOOO what happens when silly have 1800?!" (02/19/20)

import { Navigation } from 'react-native-navigation'
import * as NavigationConstants from '@NavigationConstants'
// Firebase
import { firebase } from '@react-native-firebase/auth'
// Styles
import * as StyleConstants from '@StyleConstants'
import { SetInitialUserData } from 'Gruvee/Redux/Actions/User/UserActions'
import React, { useEffect } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
// Redux
import { connect } from 'react-redux'
import { HandleSpotifyDeepLink } from './Actions/SpotifyActions'
import SocialButtons from './Buttons'

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = ({ setInitialUserData }) => {
    useEffect(() => {
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
            Linking.removeEventListener('url')
        }
    }, [])

    // Helpers
    const handleOpenUrl = async event => {
        try {
            let newUserObj = {}

            // Check to see what platform this is coming from
            if (event.url.includes('spotify_auth')) {
                // Gets API token object
                // HumansNotFish - "Team Yaya. Gotta have faith nerds."(02/21/20)
                newUserObj = await HandleSpotifyDeepLink(event)
            }

            // After auth, we should always set initial user data and sign via firebase
            setInitialUserData(newUserObj.user, newUserObj.jwt)

            const userCreds = await firebase
                .auth()
                .signInWithCustomToken(newUserObj.jwt)
            if (userCreds !== null) {
                console.log('Have user creds, pushing to playlists view.')

                // Navigate to Playlists View
                pushToPlaylistsList()
            }
        } catch (error) {
            // TODO: Handle Error
            console.warn(error)
        }
    }

    return (
        <View style={styles.Container}>
            <View>
                <Text style={styles.SectionTitle}>Let's Get Grüvee</Text>
                <Text style={styles.SectionDetail}>
                    Let all of your wildest memes come true. Just sell your soul
                    below.
                </Text>
            </View>
            <View style={styles.ButtonContainer}>
                {SOCIAL_PLATFORMS.map(platform => (
                    <SocialAuthButton
                        key={`${platform.id}`}
                        platform={platform}
                    />
                ))}
            </View>
        </View>
    )
}

// Helpers
const pushToPlaylistsList = () => {
    Navigation.push(NavigationConstants.STACK_ID, {
        component: {
            name: NavigationConstants.PLAYLIST_NAV_NAME,
            // LilCazza - 'God Save the Queen of Australia' (03/05/20)
            options: {
                topBar: {
                    visible: false,
                },
            },
        },
    })
}

// Styles
const styles = StyleSheet.create({
    ButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
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
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
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

// Redux Mappers
const mapDispatchToProps = dispatch => ({
    setInitialUserData: (user, jwt) => dispatch(SetInitialUserData(user, jwt)),
})

// sillyonly "110 to Get this! I DEMAND A DISCOUNT SINCE I AM A LOYAL CUSTOMER" (02/17/20)
export default connect(null, mapDispatchToProps)(Auth)
