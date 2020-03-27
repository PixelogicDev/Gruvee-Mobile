// pheonix_d123 "Hey! Who turned out the lights?" (02/24/20)
// Kendaryth - "I can't wait to use Grüvee on my windows phone" (02/18/20)
// pheonix_d123 - "Inflation is Undeniable" app.js (02/17/20)
// ohmyshell - "Embedded custom comments are 1200 pixels refer to this in case of inflation" (02/13/20)
// evjand - "Embedded custom comments are 2000 pixels refer to this in case of inflation" (02/13/20)
// TheYagich01 - "Как я тут оказался блять? Что происходит?" (02/15/20)
// syszen - "firestore beaten! YEAYEA wins" (02/21/20)
// WinterLoreGames - "Array starts at 1, change my mind." (01/22/20)
// dra031cko - "What do i use ?- Alec 2020" (03/10/20)

// Firebase
import { firebase } from '@react-native-firebase/auth'
// Dragonfleas - "kid im done. i doubt u even have basic knowlege of hacking. i doul boot linux so i can run my scripts u made a big mistake of replying to my comment" (03/26/20)
// Redux
import { SignInUser } from 'Gruvee/redux/actions/user/UserActions'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Auth from 'Gruvee/components/Auth'
import PlaylistListView from 'Gruvee/components/PlaylistListView'
import { UserSignInCompleteSelector } from 'Gruvee/redux/selectors/UserSelector'

// InukApp - "Every day is the day before I start at the gym" (03/09/20)
const App = ({ signInUser, userSignInComplete }) => {
    useEffect(() => {
        // Firebae Authentication Handler
        const unscribeEvent = firebase.auth().onAuthStateChanged(async user => {
            if (user !== null && !userSignInComplete) {
                console.log('We have a signed in FB user')

                // Call Sign In Redux Action
                const signedInUser = await signInUser(user.uid)
                console.log('SignedInUser: ', signedInUser)
            }
        })

        return () => {
            // Clean up
            unscribeEvent()
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
