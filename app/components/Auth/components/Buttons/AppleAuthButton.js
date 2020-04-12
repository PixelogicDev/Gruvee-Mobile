// creativenobu - "The forbidden apple auth" (02/16/20)
import React from 'react'
import { firebase } from '@react-native-firebase/auth'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'
import { ApplePlatform } from 'Gruvee/config/socials'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import { CreateNewUserDocument } from 'Gruvee/firestore/userActions'
import SocialAuthButton from './SocialAuthButton'

const AppleAuthButton = () => {
    const signInWithAppleAction = async () => {
        try {
            if (!appleAuth.isSupported) {
                return Promise.reject(new Error('Device is not on iOS 13 or higher.'))
            }

            console.log('Starting AppleAuth request!')

            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGIN,
                requestedScopes: [AppleAuthRequestScope.EMAIL],
            })

            console.log('appleAuthRequestResponse', appleAuthRequestResponse)

            const { email, nonce, identityToken, user } = appleAuthRequestResponse
            const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce)

            if (!identityToken) {
                throw new Error('Apple Auth Sign in failed - no identity token returned')
            }

            // Create new platform Object
            const applePlatform = new SocialPlatform(
                'apple',
                user,
                null,
                null,
                email,
                null,
                null,
                true,
                false
            )
            console.log(applePlatform)

            const fbUser = await CreateNewUserDocument(applePlatform)

            console.log(fbUser)

            // Sign in
            return firebase.auth().signInWithCredential(appleCredential)
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <SocialAuthButton platform={ApplePlatform} platformSignInAction={signInWithAppleAction} />
    )
}

export default AppleAuthButton
