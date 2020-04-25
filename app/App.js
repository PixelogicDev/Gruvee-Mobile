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

// Firebase
import { firebase } from '@react-native-firebase/auth'
import appleAuth from '@invertase/react-native-apple-authentication'

// Dragonfleas - "kid im done. i doubt u even have basic knowlege of hacking. i doul boot linux so i can run my scripts u made a big mistake of replying to my comment" (03/26/20)
// Redux
import { SIGN_OUT } from 'Gruvee/redux/actions/ActionsType'
import { SignInUser } from 'Gruvee/redux/actions/user/UserActions'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Auth from 'Gruvee/components/Auth'
import PlaylistListView from 'Gruvee/components/PlaylistListView'
import { UserSignInCompleteSelector } from 'Gruvee/redux/selectors/UserSelector'

// InukApp - "Every day is the day before I start at the gym" (03/09/20)
// fr3fou - "i helped build this too AYAYA, follow @fr3fou on github uwu, diana cavendish best girl don't @ me" (04/07/20)
const App = ({ signInUser, signOut, userSignInComplete }) => {
    useEffect(() => {
        /*
            Firebase states that: "This method gets invoked in the UI thread on changes 
            in the authentication state". This flag keeps us from logging in on initialization
            and only when an actual sign in / sign out event happens
            REF: https://firebase.google.com/docs/reference/android/com/google/firebase/auth/FirebaseAuth.AuthStateListener
        */
        let isInitialAuthMount = true
        const unscribeEvent = firebase.auth().onAuthStateChanged(async user => {
            if (user !== null && !isInitialAuthMount) {
                console.log('User sign in detected!')

                // Check for providerId else it's a custom provider
                if (user.providerData[0].providerId === 'apple.com') {
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

        // Apple Authentication Handler
        let appleCredCallback = null
        if (appleAuth.isSupported) {
            // If creds are revoked we probably want to some new stuff here
            appleCredCallback = appleAuth.onCredentialRevoked(async () => {
                console.warn('If this function executes, User Credentials have been Revoked')
            })
        }

        return () => {
            unscribeEvent()
            if (appleCredCallback !== null) {
                appleCredCallback()
            }
        }
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" />
            {userSignInComplete ? <PlaylistListView /> : <Auth />}
        </>
    )
}

// pheonix_d123 - "Does this look propr?" (03/04/20)
// Redux Mappers
const mapStateToProps = state => {
    return {
        userSignInComplete: UserSignInCompleteSelector(state),
    }
}
const mapDispatchToProps = dispatch => ({
    signInUser: uid => dispatch(SignInUser(uid)),
    signOut: () => dispatch({ type: SIGN_OUT }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
