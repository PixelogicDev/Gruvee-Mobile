// MrDemonWolf - "A Furry was here" (02/17/20)
// BackeyM - "I don't like furrys" (02/17/20)
// sillyonly - "aaah some said JS or TS would be nice! but you know what! I think if you wrote it in C you would've made perfection!" (02/18/20)
// BackeyM - "pee pee poo poo" (02/18/20)
// dra031cko - "android > ios" (02/19/20)
// sillyonly - "SOOOOOO what happens when silly have 1800?!" (02/19/20)

// Firebase
import { firebase } from '@react-native-firebase/auth'
// Styles
import * as StyleConstants from '@StyleConstants'
// Firestore
import {
    CreateNewUserDocument,
    CreateSocialPlatformDocument,
} from 'Gruvee/Firestore/UserActions'
import { SetInitialUserData } from 'Gruvee/Redux/Actions/User/UserActions'
import {
    AuthorizeUser,
    GetCustomFirebaseToken,
} from 'Gruvee/Service/Spotify/Endpoints'
import React, { useEffect } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
// Redux
import { connect } from 'react-redux'
import { HandleSpotifyAuth } from './Actions/SpotifyActions'
import SocialButtons from './Buttons'

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = ({ setInitialUserData }) => {
    useEffect(() => {
        // Here is where we should check for token expiry for third party oauth

        // Firebae Authentication Handler
        const authStatus = firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                // This currently is being set on the component state
                // We will probably need to see what is being returned here and how to set on userState
                // If user is here, we should call our signIn action
                // Switch to playlists view
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

    // Helpers
    const handleOpenUrl = async event => {
        // Check to see what platform this is coming from
        if (event.url.includes('spotify_auth')) {
            // Gets API token object
            // HumansNotFish - "Team Yaya. Gotta have faith nerds."(02/21/20)
            try {
                const tokenObj = await HandleSpotifyAuth(event.url)

                // Authorize Spotify User and bring back user doc from db if it exists
                let newUser = await AuthorizeUser(tokenObj.access_token)

                if (!newUser.userExists) {
                    // At this point write user to DB
                    console.log('Time to create a new user...')

                    // Create and set social platform object
                    const newPlatform = await CreateSocialPlatformDocument(
                        newUser,
                        tokenObj
                    )

                    // Create and set user object
                    newUser = await CreateNewUserDocument(newPlatform)
                }

                // Get JWT
                const jwt = await GetCustomFirebaseToken(newUser.id)
                setInitialUserData(newUser, jwt.token)
            } catch (error) {
                // Handle this error?
                console.warn(error)
            }
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
