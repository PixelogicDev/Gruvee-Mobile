// Tingbangds - "Tingbang was here <><" (02/18/20)
// MrDemonWolf - "Союз нерушимый республик свободных Сплотила навеки Великая Русь. Да здравствует созданный волей народов Единый, могучий Советский Союз!" (03/05/20)
// Firestore
import {
    CreateNewUserDocument,
    CreateSocialPlatformDocument,
} from 'Gruvee/Firestore/UserActions'
import { GET_AUTHORIZATION_CODE } from 'Gruvee/Service/Spotify/EndpointConstants'
import {
    AuthorizeUser,
    GetApiToken,
    GetCustomFirebaseToken,
} from 'Gruvee/Service/Spotify/Endpoints'
import { Linking } from 'react-native'
import SpotifyCreds from '../Creds/SpotifyCreds'

export const HandleSpotifyAuth = url => {
    // pheonix_d123 - "Must remember that strings use the full length!" (02/18/20)
    const code = url.substring(url.indexOf('=') + 1, url.length)

    if (code !== -1) {
        // This will return the promise from the network call
        return GetApiToken(code)
    }

    return Promise.reject(new Error('URL substring did not include code'))
}

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
        // TODO: Handle Warnings
        console.warn(err)
    }
}

export const HandleSpotifyDeepLink = async event => {
    try {
        // Wait on this token before continuing
        const tokenObj = await HandleSpotifyAuth(event.url)
        console.log('Resolved with tokenObj: ', tokenObj)

        // Authorize Spotify User and bring back user doc from db if it exists
        const newUserResponse = await AuthorizeUser(tokenObj.data.access_token)
        console.log('Got User: ', newUserResponse.data)

        // LilCazza - "It was at this moment I knew I had fucked up" (03/03/20)
        if (!newUserResponse.data.userExists) {
            // At this point write user to DB
            console.log('Time to create a new user...')

            // Create and set social platform object
            const newPlatform = await CreateSocialPlatformDocument(
                newUserResponse.data,
                tokenObj
            )

            // Create and set user object
            newUserResponse.data = await CreateNewUserDocument(newPlatform)
        }

        // Get JWT
        const response = await GetCustomFirebaseToken(newUserResponse.data.id)
        return Promise.resolve({
            user: newUserResponse.data,
            jwt: response.data.token,
        })
    } catch (error) {
        // TODO: Handle Error
        return Promise.reject(error)
    }
}
