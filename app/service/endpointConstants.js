import { ENVIRONMENT, FIREBASE_DEV_URI, FIREBASE_PROD_URI } from '@env'

const baseHostName = ENVIRONMENT === 'PROD' ? FIREBASE_PROD_URI : FIREBASE_DEV_URI
const spotifyApiHostname = 'https://api.spotify.com'
const spotifyAccountsHostname = 'https://accounts.spotify.com'

/**
 * Service endpoints specifically for Apple
 */
export const APPLE_ENDPOINTS = {
    authorizeAppleUser: `${baseHostName}/authorizeWithApple`,
}

/**
 * Service endpoints specifically for Spotify
 */
export const SPOTIFY_ENDPOINTS = {
    getApiToken: `${spotifyAccountsHostname}/api/token`,
    getAuthorizationCode: (clientId, scopes, redirectUri) =>
        `${spotifyAccountsHostname}/authorize?response_type=code&client_id=${clientId}${
            scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
        }&redirect_uri=${redirectUri}`.trim(),
    getCurrentUser: `${spotifyApiHostname}/v1/me`,
    getSpotifyMedia: `${baseHostName}/getSpotifyMedia`,
}

// curiousdrive - "East to West Gruvee is the best!!!" (03/22/20)
/**
 * Service endpoints for any of our service providers
 */
export const COMMON_ENDPOINTS = {
    authorizeSpotifyUser: `${baseHostName}/authorizeWithSpotify`,
    createSocialPlatform: `${baseHostName}/createSocialPlatform`,
    createSocialPlaylist: `${baseHostName}/createSocialPlaylist`,
    createUser: `${baseHostName}/createUser`,
    createProviderUser: `${baseHostName}/createProviderUser`,
    doesUserDocExist: `${baseHostName}/doesUserDocExist`,
    getCustomFirebaseToken: `${baseHostName}/generateCustomToken`,
    isUsernameAvailable: `${baseHostName}/usernameAvailable`,
}
