import { Linking } from 'react-native'
import { APPLE_ENDPOINTS } from 'Gruvee/service/endpointConstants'

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
