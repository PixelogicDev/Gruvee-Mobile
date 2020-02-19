// Tingbangds - "Tingbang was here <><" (02/18/20)
import { Linking } from 'react-native'

import { GET_AUTHORIZATION_CODE } from 'Gruvee/Service/Spotify/EndpointConstants'
import { GetApiToken } from 'Gruvee/Service/Spotify/Endpoints'
import SpotifyCreds from '../Creds/SpotifyCreds'

export const HandleSpotifyAuth = async url => {
    // Get code
    // pheonix_d123 - "Must remember that strings use the full length!" (02/18/20)
    const code = url.substring(url.indexOf('=') + 1, url.length)
    let result

    if (code !== -1) {
        // Time to get API Token
        try {
            const token = await GetApiToken(code)
            result = Promise.resolve(token)
        } catch (error) {
            result = Promise.reject(error)
        }
    }

    return result
}

export const GetAuthorizationCode = async () => {
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
    ]
    const scopes = scopesArr.join(' ')

    try {
        // Will open our browser to Spotify sign in
        await Linking.openURL(
            GET_AUTHORIZATION_CODE(
                SpotifyCreds.clientId,
                scopes,
                SpotifyCreds.redirectUri
            )
        )
    } catch (err) {
        console.warn(err)
    }
}
