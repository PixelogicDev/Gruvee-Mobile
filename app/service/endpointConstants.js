import { ENVIRONMENT, FIREBASE_PROD_URI } from 'react-native-dotenv'

const baseHostName = ENVIRONMENT === 'PROD' ? FIREBASE_PROD_URI : `http://localhost:8080`
const spotifyApiHostname = 'https://api.spotify.com'
const spotifyAccountsHostname = 'https://accounts.spotify.com'

export const SPOTIFY_ENDPOINTS = {
    getApiToken: `${spotifyAccountsHostname}/api/token`,
    getAuthorizationCode: (clientId, scopes, redirectUri) =>
        `${spotifyAccountsHostname}/authorize?response_type=code&client_id=${clientId}${
            scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
        }&redirect_uri=${redirectUri}`.trim(),
    getCurrentUser: `${spotifyApiHostname}/v1/me`,
}

// curiousdrive - "East to West Gruvee is the best!!!" (03/22/20)
export const COMMON_ENDPOINTS = {
    authorizeUser: `${baseHostName}/authorizeWithSpotify`,
    createSocialPlaylist: `${baseHostName}/createSocialPlaylist`,
    getCustomFirebaseToken: `${baseHostName}/generateCustomToken`,
}
