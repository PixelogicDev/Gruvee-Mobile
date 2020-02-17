// creativenobu - "The forbidden apple auth" (02/16/20)
import React from 'react'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'
import { ApplePlatform } from 'Gruvee/SocialConstants'
import SocialAuthButton from './SocialAuthButton'

const AppleAuthButton = () => {
    const signInWithAppleAction = async () => {
        if (!appleAuth.isSupported) {
            return Promise.reject(
                new Error('Device is not on iOS 13 or higher.')
            )
        }

        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL],
        })

        // Get current authentication state for user
        const credentialState = await appleAuth.getCredentialStateForUser(
            // User === UserId from Firebase
            appleAuthRequestResponse.user
        )

        console.log(credentialState)

        // Use credentialState response to ensure the user is authenticated
        if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
            // We are authenicated, let move onto the creation of our user document in our DB
            return Promise.resolve(appleAuthRequestResponse.user)
        }

        return Promise.reject(new Error(credentialState))
    }

    return (
        <SocialAuthButton
            platform={ApplePlatform}
            platformSignInAction={signInWithAppleAction}
        />
    )
}

export default AppleAuthButton
