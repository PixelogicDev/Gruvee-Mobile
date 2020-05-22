// rushkiB - "Should have used flutter instead." (04/08/20)
// pheonix_d123 - "Hey! Who turned out the lights?" (02/24/20)
// Kendaryth - "I can't wait to use Grüvee on my windows phone" (02/18/20)
// pheonix_d123 - "Inflation is Undeniable" app.js (02/17/20)
// ohmyshell - "Embedded custom comments are 1200 pixels refer to this in case of inflation" (02/13/20)
// evjand - "Embedded custom comments are 2000 pixels refer to this in case of inflation" (02/13/20)
// TheYagich01 - "Как я тут оказался блять? Что происходит?" (02/15/20)
// syszen - "firestore beaten! YEAYEA wins" (02/21/20)
// Dragonfleas - "Dear maintainer: Once you are done trying to 'optimize' this simple app.js file to prove your worth, and have realized what a terrible mistake that was, please increment the following counter as a warning to the next guy: total_hours_wasted_here = 42"(04/06/20)
// WinterLoreGames - "Array starts at 1, change my mind." (01/22/20)
// dra031cko - "What do i use ?- Alec 2020" (03/10/20)
// Dragonfleas - "kid im done. i doubt u even have basic knowlege of hacking. i doul boot linux so i can run my scripts u made a big mistake of replying to my comment" (03/26/20)

import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Linking, Platform, Text, TouchableOpacity } from 'react-native'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { AUTH_NAVIGATOR, SIGNED_IN_NAVIGATOR } from 'Gruvee/config/navigation/navigators'
import { BASE_THEME } from 'Gruvee/config/navigation/themes'

// Firebase
import { firebase } from '@react-native-firebase/auth'

// Redux
import { SIGN_OUT } from 'Gruvee/redux/actions/ActionsType'
import { SetInitialUserData, SignInUser } from 'Gruvee/redux/actions/user/UserActions'
import { connect } from 'react-redux'
import { UserSignInCompleteSelector } from 'Gruvee/redux/selectors/UserSelector'
import { HandleSpotifyDeepLink } from 'Gruvee/components/Auth/components/Buttons/actions/SpotifyActions'
import { HandleAppleDeepLink } from 'Gruvee/components/Auth/components/Buttons/actions/AppleActions'
import AsyncStorage from '@react-native-community/async-storage'

// InukApp - "Every day is the day before I start at the gym" (03/09/20)
// fr3fou - "i helped build this too AYAYA, follow @fr3fou on github uwu, diana cavendish best girl don't @ me" (04/07/20)

const DEEP_LINK_IN_PROGRESS_FLAG = '@Deep_Link_In_Progress'

// Sign Out Button For Playlist View
const SignOutButton = signOutAction => {
    return (
        <TouchableOpacity
            onPress={() => {
                signOutAction()
                firebase.auth().signOut()
            }}
        >
            <Text style={{ fontSize: 16, color: 'white' }}>Sign Out</Text>
        </TouchableOpacity>
    )
}

const App = ({ setInitialUserData, signInUser, signOut, userSignInComplete }) => {
    useEffect(() => {
        /*
            Firebase states that: "This method gets invoked in the UI thread on changes 
            in the authentication state". This flag keeps us from logging in on initialization
            and only when an actual sign in / sign out event happens
            REF: https://firebase.google.com/docs/reference/android/com/google/firebase/auth/FirebaseAuth.AuthStateListener
        */
        let isInitialAuthMount = true
        const unscribeEvent = firebase.auth().onAuthStateChanged(async user => {
            console.log(user)
            if (user !== null && !isInitialAuthMount) {
                console.log('User sign in detected!')

                // Check for providerId else it's a custom provider
                if (user.providerData.length && user.providerData[0].providerId === 'apple.com') {
                    console.log('Received signIn with Apple')
                    // await signInUser(user.uid)
                } else if (!isInitialAuthMount && user === null) {
                    signOut()
                } else {
                    // Call Sign In Redux Action
                    await signInUser(user.uid)
                }
            }

            isInitialAuthMount = false
        })

        // Deep Link Handler
        if (Platform.OS === 'android') {
            // Android instaniates multiple activites with deep links
            // To combat insane calls to this handler, set a flag here to stop it if it's already working
            AsyncStorage.getItem(DEEP_LINK_IN_PROGRESS_FLAG).then(value => {
                console.log('GOT DEEPLINKFLAG: ', value)
                if (value === null || value === 'false') {
                    // First time running this
                    Linking.getInitialURL().then(url => {
                        if (url !== null) {
                            handleOpenUrl(setInitialUserData)({ url })
                        }
                    })
                }
            })
        } else {
            Linking.addEventListener('url', handleOpenUrl(setInitialUserData))
        }

        return () => {
            unscribeEvent()
            Linking.removeEventListener('url')
        }
    }, [])

    return (
        <NavigationContainer theme={BASE_THEME}>
            {userSignInComplete ? SIGNED_IN_NAVIGATOR(SignOutButton(signOut)) : AUTH_NAVIGATOR}
        </NavigationContainer>
    )
}

// Helpers
const handleOpenUrl = setInitialUserData => async event => {
    try {
        let newUserObj = {}
        AsyncStorage.setItem('@Deep_Link_In_Progress', 'true')

        // Check to see what platform this is coming from
        if (event.url.includes('spotify_auth')) {
            // Gets API token object
            // HumansNotFish - "Team Yaya. Gotta have faith nerds."(02/21/20)
            newUserObj = await HandleSpotifyDeepLink(event)
        } else if (event.url.includes('apple_auth')) {
            console.log('Starting apple auth deeplink')

            // Create social platform
            await HandleAppleDeepLink(event)

            // TODO: Prompt add username UI

            // TODO: Create firebase user

            // TODO: Sign in
        }
        // After auth, we should always set initial user data and sign via firebase
        setInitialUserData(newUserObj.user)
        AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
    } catch (error) {
        // TODO: Handle Error
        console.warn(error)
        AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
    }
}

// pheonix_d123 - "Does this look propr?" (03/04/20)
// Redux Mappers
const mapStateToProps = state => {
    return {
        userSignInComplete: UserSignInCompleteSelector(state),
    }
}
const mapDispatchToProps = dispatch => ({
    setInitialUserData: (user, jwt) => dispatch(SetInitialUserData(user, jwt)),
    signInUser: uid => dispatch(SignInUser(uid)),
    signOut: () => dispatch({ type: SIGN_OUT }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
