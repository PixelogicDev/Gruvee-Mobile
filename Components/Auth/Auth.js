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
import { SetInitialUserData } from 'Gruvee/Redux/Actions/User/UserActions'
import React, { useEffect } from 'react'
import { Linking, StyleSheet, Text, View, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Redux
import { connect } from 'react-redux'
import { HandleSpotifyDeepLink } from './Actions/SpotifyActions'
import SocialButtons from './Buttons'

const DEEP_LINK_IN_PROGRESS_FLAG = '@Deep_Link_In_Progress'

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = ({ setInitialUserData }) => {
    useEffect(() => {
        // TODO: These are used now while we do not have a signout method
        // firebase.auth().signOut()
        // AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
        // Deep Link Handler
        if (Platform.OS === 'android') {
            // Android instaniates multiple activites with deep links
            // To combat insane calls to out handler, set a flag here to stop it if it's already working
            AsyncStorage.getItem(DEEP_LINK_IN_PROGRESS_FLAG).then(value => {
                if (value === null || value === 'false') {
                    // First time running this
                    Linking.getInitialURL().then(url => {
                        if (url !== null) {
                            handleOpenUrl({ url })
                        }
                    })
                }
            })
        } else {
            Linking.addEventListener('url', handleOpenUrl)
        }

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
            AsyncStorage.setItem('@Deep_Link_In_Progress', 'true')

            // Check to see what platform this is coming from
            if (event.url.includes('spotify_auth')) {
                // Gets API token object
                // HumansNotFish - "Team Yaya. Gotta have faith nerds."(02/21/20)
                newUserObj = await HandleSpotifyDeepLink(event)
            }

            // After auth, we should always set initial user data and sign via firebase
            setInitialUserData(newUserObj.user, newUserObj.jwt)

            // Passes back userCreds, not sure what to do with those yet
            firebase.auth().signInWithCustomToken(newUserObj.jwt)

            AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
        } catch (error) {
            // TODO: Handle Error
            console.warn(error)

            AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
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
            <View style={styles.ButtonContainer}>{SocialButtons}</View>
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
