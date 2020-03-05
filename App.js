// pheonix_d123 "Hey! Who turned out the lights?" (02/24/20)
// Kendaryth - "I can't wait to use Grüvee on my windows phone" (02/18/20)
// pheonix_d123 - "Inflation is Undeniable" app.js (02/17/20)
// ohmyshell - "Embedded custom comments are 1200 pixels refer to this in case of inflation" (02/13/20)
// evjand - "Embedded custom comments are 2000 pixels refer to this in case of inflation" (02/13/20)
// TheYagich01 - "Как я тут оказался блять? Что происходит?" (02/15/20)
// syszen - "firestore beaten! YEAYEA wins" (02/21/20)
// WinterLoreGames - "Array starts at 1, change my mind." (01/22/20)

// Firebase
import { firebase } from '@react-native-firebase/auth'
import * as StyleConstants from '@StyleConstants'
import * as NavigationConstants from '@NavigationConstants'
// Redux
import { SignInUser } from 'Gruvee/Redux/Actions/User/UserActions'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Auth from 'Gruvee/Components/Auth/Auth'
import PlaylistListView from 'Gruvee/Components/Playlist/PlaylistListView'
import { Navigation } from 'react-native-navigation'

const App = ({ signInUser }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        // Firebae Authentication Handler
        const authStatus = firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                // What should do with the JWT (ie how often does it need to be refreshed?)
                // We have a user, lets grab our stuff from DB
                setCurrentUser(user)

                // Call Sign In Redux Action
                signInUser(user.uid)

                // Here is where we should check for token expiry for third party oauth
                // This currently is being set on the component state
                // We will probably need to see what is being returned here and how to set on userState
                // If user is here, we should call our signIn action
                // Switch to playlists view
            }
        })

        return () => {
            // Clean up
            authStatus()
        }
    }, [])
    return (
        <>
            <StatusBar barStyle="light-content" />
            {isSignedIn(currentUser)}
        </>
    )
}

// Helpers
// pheonix_d123 - "Does this look propr?" (03/04/20)
const isSignedIn = currentUser => {
    return currentUser !== null ? <PlaylistListView /> : <Auth />
}

// Redux Mappers
const mapDispatchToProps = dispatch => ({
    signInUser: uid => dispatch(SignInUser(uid)),
})

export default connect(null, mapDispatchToProps)(App)
