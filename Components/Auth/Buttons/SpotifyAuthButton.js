import React from 'react'
import { SpotifyPlatform } from 'Gruvee/SocialConstants'
import SocialAuthButton from './SocialAuthButton'
import { GetAuthorizationCode } from '../Actions/SpotifyActions'

const SpotifyAuthButton = () => {
    const signInWithSpotifyAction = () => {
        // This should all our Firebase Function to start our flow
        // After auth, we will need to bring the token back here some
        // Then continue on
        GetAuthorizationCode()
    }
    return (
        <SocialAuthButton
            platform={SpotifyPlatform}
            platformSignInAction={signInWithSpotifyAction}
        />
    )
}

export default SpotifyAuthButton
