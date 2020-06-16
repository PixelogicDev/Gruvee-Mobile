import { Linking } from 'react-native'
import { APPLE_ENDPOINTS } from 'Gruvee/service/endpointConstants'
import { UpdateSocialPlatform } from 'Gruvee/firestore/socialPlatformActions'
import { CreateSocialPlaylist } from 'Gruvee/service/common/endpoints'

// eslint-disable-next-line import/prefer-default-export
export const InitAppleMusicAuthFlow = () => {
    // Open browser and call this thing
    if (Linking.canOpenURL(APPLE_ENDPOINTS.authorizeAppleUser)) {
        Linking.openURL(APPLE_ENDPOINTS.authorizeAppleUser)
    } else {
        console.warn(`${APPLE_ENDPOINTS.authorizeAppleUser} is not a valid URI`)
    }
}

// OnePocketPimp - "Alec discovered Apple APIs are a pain in the ass" (05/06/20)
export const HandleAppleDeepLink = async (userId, event, playlistTitle) => {
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
    const updatedPlatform = await UpdateSocialPlatform(userId, socialAPIToken)
    const platformData = updatedPlatform.data()

    // Create social playlist
    await CreateSocialPlaylist(platformData, playlistTitle)
}
