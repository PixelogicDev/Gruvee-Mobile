// creativenobu - "The forbidden apple auth" (02/16/20)
import React from 'react'
import { firebase } from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication'
import { ApplePlatform } from 'Gruvee/config/socials'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import { ADD_USERNAME_NAME } from 'Gruvee/config/navigation/constants'
import { DoesAppleUserExistInFirebase } from './actions/AppleActions'
import SocialAuthButton from './SocialAuthButton'

const AppleAuthButton = () => {
    const navigation = useNavigation()

    return (
        <SocialAuthButton
            platform={ApplePlatform}
            platformSignInAction={signInWithAppleAction(navigation)}
        />
    )
}

// Actions
const signInWithAppleAction = navigation => async () => {
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

        // Get apple credentials and check to see if this apple user already created an account
        const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce)
        const uid = `apple:${user}`

        // Check if user doc already exists for current uid
        const doesDocumentExist = await DoesAppleUserExistInFirebase(uid)

        if (!doesDocumentExist.data.result) {
            // Create new platform Object
            const applePlatform = new SocialPlatform(
                'apple',
                user, // This is a string id
                null,
                null,
                email,
                null,
                null,
                true,
                false
            )

            // At this point navigate to choose username view
            navigation.push(ADD_USERNAME_NAME, { applePlatform, appleCredential })
        } else {
            console.log('Found user doc signing in...')
            // Sign in with Credentials so user can start making queries to Firebase
            await firebase.auth().signInWithCredential(appleCredential)
        }
    } catch (error) {
        console.warn(error)
    }
}

export default AppleAuthButton
