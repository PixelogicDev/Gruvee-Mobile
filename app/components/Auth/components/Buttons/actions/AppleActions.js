import { Linking } from 'react-native'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import { CreateSocialPlatform, GetCustomFirebaseToken } from 'Gruvee/service/common/endpoints'
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

export const HandleAppleDeepLink = async event => {
    try {
        // Wait on this token before continuing
        const code = event.url.substring(event.url.indexOf('?') + 1, event.url.length)

        // Create new social platform
        const applePlatform = new SocialPlatform(
            'apple',
            `apple:${uuidv4()}`, // this is usually the id of the user brought from the provider
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

        // We need to generate a firebase JWT
        const tokenObj = await GetCustomFirebaseToken(applePlatform.id)

        // Sign in

        // I think we need to create user before signing in

        // We musicUserToken and thats it
        // We actually need to show some sort of username picker thing here
    } catch (error) {
        // TODO: Handle Error
        return Promise.reject(error)
    }
}
