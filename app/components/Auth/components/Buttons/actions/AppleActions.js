import { Linking } from 'react-native'
import { APPLE_ENDPOINTS } from 'Gruvee/service/endpointConstants'
import { UpdateSocialPlatform } from 'Gruvee/firestore/socialPlatformActions'

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
export const HandleAppleDeepLink = async (userId, event) => {
    // Get code
    const code = event.url.substring(event.url.indexOf('?') + 1, event.url.length)

    // Create firebase object
    const socialAPIToken = {
        apiToken: {
            createdAt: new Date().toISOString(),
            expiratedAt: '',
            expiresIn: -1,
            token: code,
        },
    }

    // Write to user document
    await UpdateSocialPlatform(userId, socialAPIToken)
}
