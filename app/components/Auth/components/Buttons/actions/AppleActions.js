import { Linking } from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import {
    CreateSocialPlatform,
    CreateUser,
    GetCustomFirebaseToken,
} from 'Gruvee/service/common/endpoints'
import { APPLE_ENDPOINTS } from 'Gruvee/service/endpointConstants'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line import/prefer-default-export
export const InitAppleMusicAuthFlow = () => {
    console.log('Starting AppleMusic Auth Flow')

    // Open browser and call this thing
    if (Linking.canOpenURL(APPLE_ENDPOINTS.authorizeAppleUser)) {
        console.log('Opening Apple Music Auth endpoint')
        Linking.openURL(APPLE_ENDPOINTS.authorizeAppleUser)
    } else {
        console.warn(`${APPLE_ENDPOINTS.authorizeAppleUser} is not a valid URI`)
    }

    // Handle the deep link later
    // TODO: Add deep link supprt for: gruvee://apple_auth
}

// OnePocketPimp - "Alec discovered Apple APIs are a pain in the ass" (05/06/20)
export const HandleAppleDeepLink = async event => {
    try {
        const code = event.url.substring(event.url.indexOf('?') + 1, event.url.length)

        // Create new social platform
        const id = uuidv4()
        const applePlatform = new SocialPlatform(
            'apple',
            id,
            null,
            null,
            null,
            { createdAt: '', expiredAt: '', expiresIn: 0, token: code },
            null,
            true,
            true
        )

        // Call create platform function
        const createSocialPlatformResp = await CreateSocialPlatform(applePlatform)
        if (createSocialPlatformResp.status !== 200) {
            console.log('Social Platform was not created')
            return
        }

        // Create User object
        const createUserRequest = {
            id: `apple:${id}`,
            email: applePlatform.email,
            socialPlatformPath: `social_platforms/${id}`,
            profileImage: applePlatform.profileImage,
            username: 'YaBoiApple', // TODO: NEED ACTUAL USERNAME
        }

        const firebaseUser = await CreateUser(createUserRequest)

        // We need to generate a firebase JWT
        // DevBowser - "They made me write it, against my will." (05/06/20)
        const tokenObj = await GetCustomFirebaseToken(firebaseUser.data.id)

        // Need to login client
        const userResponse = await firebase.auth().signInWithCustomToken(tokenObj.data.token)

        // LilCazza - "It was at this moment I knew I had fucked up" (03/03/20)
        return userResponse.data
    } catch (error) {
        // TODO: Handle Error
        return Promise.reject(error)
    }
}
