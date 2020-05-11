// creativenobu - "The forbidden apple auth" (02/16/20)
import React from 'react'
import { firebase } from '@react-native-firebase/auth'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'
import * as NavigationConstants from 'Gruvee/config/navigation'
import { ApplePlatform } from 'Gruvee/config/socials'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import { CreateNewUserDocument } from 'Gruvee/firestore/userActions'
import SocialAuthButton from './SocialAuthButton'
import { CreateDocumentAndSignIn } from './actions/SharedActions'
import { InitAppleMusicAuthFlow } from './actions/AppleActions'

const AppleAuthButton = () => {
    const signInWithAppleAction = async () => {
        try {
            if (!appleAuth.isSupported) {
                // TODO: NEEDS A FALLBACK
                throw new Error('Device is not on iOS 13 or higher.')
            }

            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGIN,
                requestedScopes: [AppleAuthRequestScope.EMAIL],
            })

            const { email, nonce, identityToken, user } = appleAuthRequestResponse
            if (!identityToken) {
                throw new Error('Apple Auth Sign in failed - no identity token returned')
            }

            const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce)
            // Create new platform Object
            /* const applePlatform = new SocialPlatform(
                'apple',
                user,
                null,
                null,
                email,
                null,
                null,
                true,
                false
            ) */

            // At this point navigate to choose username view

            // Once we get sign in information, we should get MusicKit keys/token
            // CreateDocumentAndSignIn(applePlatform, appleCredential)
            // InitAppleMusicAuthFlow()
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <SocialAuthButton platform={ApplePlatform} platformSignInAction={signInWithAppleAction} />
    )
}

export default AppleAuthButton
