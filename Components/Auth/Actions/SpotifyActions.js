import { Linking } from 'react-native'
import axios from 'axios'
import { Buffer } from 'buffer'
import SpotifyCreds from '../Creds/SpotifyCreds'

export const HandleSpotifyAuth = async url => {
    // Get code
    const code = url.substring(url.indexOf('=') + 1, url.length)

    if (code !== -1) {
        // Time to get API Token
        await getApiToken(code)
    }
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
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
            SpotifyCreds.clientId
        }${scopes ? `&scope=${encodeURIComponent(scopes)}` : ''}&redirect_uri=${
            SpotifyCreds.redirectUri
        }`.trim()

        // Will open our browser to Spotify sign in
        await Linking.openURL(authUrl)
    } catch (err) {
        console.warn(err)
    }
}

// Helper
const getApiToken = async code => {
    // After token is received set token in state
    // Then create Firebase user with some link to Spotify account

    try {
        const credsB64 = Buffer.from(
            `${SpotifyCreds.clientId}:${SpotifyCreds.clientSecret}`
        ).toString('base64')
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('code', code)
        params.append('redirect_uri', SpotifyCreds.redirectUri)

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: params,
            url: 'https://accounts.spotify.com/api/token',
        }

        const response = await axios(options)

        // We have API Token
        // Now, we can get username or spotify user id and create Firebase User
        // Also need to create user state redux object with token info

        // const {
        //     access_token: response.data.accessToken,
        //     refresh_token: refreshToken,
        //     expires_in: expiresIn,
        // } = responseJson

        // const expirationTime = new Date().getTime() + expiresIn * 1000
        // await setUserData('accessToken', accessToken)
        // await setUserData('refreshToken', refreshToken)
        // await setUserData('expirationTime', expirationTime)
    } catch (err) {
        console.error(err)
    }
}
