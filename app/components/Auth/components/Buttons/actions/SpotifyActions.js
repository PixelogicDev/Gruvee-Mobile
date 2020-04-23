// Tingbangds - "Tingbang was here <><" (02/18/20)
// MrDemonWolf - "Союз нерушимый республик свободных Сплотила навеки Великая Русь. Да здравствует созданный волей народов Единый, могучий Советский Союз!" (03/05/20)
// iWorkAtMcDonals - "PÅGGÄRS" (03/12/20)
// Mheetu - "Contributing Guidelines: Use semicolons." (03/13/20)
// Isakfk1234 - "incoming code" (03/13/20)
// Firestore
import { SPOTIFY_ENDPOINTS } from 'Gruvee/service/endpointConstants'
import { AuthorizeUser, GetApiToken } from 'Gruvee/service/spotify/endpoints'
import { Linking } from 'react-native'
import Creds from 'Gruvee/config/creds'
import { firebase } from '@react-native-firebase/auth'

export const HandleSpotifyAuth = url => {
    // pheonix_d123 - "Must remember that strings use the full length!" (02/18/20)
    const code = url.substring(url.indexOf('=') + 1, url.length)

    if (code !== -1) {
        // This will return the promise from the network call
        return GetApiToken(code)
    }

    return Promise.reject(new Error('URL substring did not include code'))
}

// LilCazza - "This project was only supposed to take 30 days. monkaS ..... It's now day 96. monkaS" (03/13/20)
export const InitAuthorizationCodeFlow = async () => {
    const scopesArr = [
        'user-read-currently-playing',
        'user-read-playback-state',
        'user-library-modify',
        'user-library-read',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-read-recently-played',
        'user-top-read',
        'user-read-email',
        'user-read-private ',
    ]
    const scopes = scopesArr.join(' ')

    try {
        // Will open our browser to Spotify sign in
        await Linking.openURL(
            SPOTIFY_ENDPOINTS.getAuthorizationCode(
                Creds.Spotify.clientId,
                scopes,
                Creds.Spotify.redirectUri
            )
        )
    } catch (err) {
        // TODO: Handle Warnings
        console.warn(err)
    }
}

export const HandleSpotifyDeepLink = async event => {
    try {
        // Wait on this token before continuing
        const tokenObj = await HandleSpotifyAuth(event.url)

        // Authorize Spotify User and bring back user doc from db if it exists
        const userResponse = await AuthorizeUser(
            tokenObj.data.access_token,
            tokenObj.data.expires_in,
            tokenObj.data.refresh_token
        )

        // Need to login client
        await firebase.auth().signInWithCustomToken(userResponse.data.jwt)

        // LilCazza - "It was at this moment I knew I had fucked up" (03/03/20)
        return Promise.resolve({
            user: userResponse.data,
        })
    } catch (error) {
        // TODO: Handle Error
        return Promise.reject(error)
    }
}
