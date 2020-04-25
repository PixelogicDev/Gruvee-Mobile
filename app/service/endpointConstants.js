import { ENVIRONMENT, FIREBASE_DEV_URI, FIREBASE_PROD_URI } from 'react-native-dotenv'

const baseHostName = ENVIRONMENT === 'PROD' ? FIREBASE_PROD_URI : FIREBASE_DEV_URI
const spotifyApiHostname = 'https://api.spotify.com'
const spotifyAccountsHostname = 'https://accounts.spotify.com'

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
export const COMMON_ENDPOINTS = {
    authorizeSpotifyUser: `${baseHostName}/authorizeWithSpotify`,
    createSocialPlatform: `${baseHostName}/createSocialPlatform`,
    createSocialPlaylist: `${baseHostName}/createSocialPlaylist`,
    createUser: `${baseHostName}/createUser`,
    getCustomFirebaseToken: `${baseHostName}/generateCustomToken`,
}
