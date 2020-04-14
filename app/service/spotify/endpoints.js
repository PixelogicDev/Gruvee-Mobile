// no_neon_one = "What about flutter?" (02/18/20)
// This will house our logic for our Spotify Endpoints
import axios from 'axios'
import { Buffer } from 'buffer'
import Creds from 'Gruvee/config/creds'
// Env Variables
import { SPOTIFY_ENDPOINTS, COMMON_ENDPOINTS } from 'Gruvee/service/endpointConstants'

// -- Spotify API -- //
// GET: Calls spotify API to get track info based on ID
export const GetSpotifyTrack = (trackId, token) => {
    // Header needs an Authorization token
    // We need to append the trackId to to the url
    const headers = {
        Authorization: `Bearer ${token}`,
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'GET',
        url: `SPOTIFY_ENDPOINTS.getTrack/${trackId}`,
        headers,
    }

    // This already returns a promise
    return axios(options)
}

// POST: API Token Request
export const GetApiToken = code => {
    const credsB64 = Buffer.from(
        `${Creds.Spotify.clientId}:${Creds.Spotify.clientSecret}`
    ).toString('base64')

    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', Creds.Spotify.redirectUri)

    const headers = {
        Authorization: `Basic ${credsB64}`,
        'content-type': 'application/x-www-form-urlencoded',
    }

    const options = {
        method: 'POST',
        url: SPOTIFY_ENDPOINTS.getApiToken,
        headers,
        data: params,
    }

    // This already returns a promise
    return axios(options)
}

// POST: Authorize Spotify User
export const AuthorizeUser = (token, expiresIn, refreshToken) => {
    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.authorizeUser,
        data: {
            token,
            expiresIn,
            refreshToken,
        },
    }

    // This already returns a promise
    return axios(options)
}

// KociQQ: Comment - "Found on StackOverflow, don't trust this code" (02/25/20)
// GET: Get Custom Firebase Token
export const GetCustomFirebaseToken = async uid => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.getCustomFirebaseToken,
        headers,
        data: { uid },
    }

    // This already returns a promise
    return axios(options)
}
