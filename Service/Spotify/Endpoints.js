// no_neon_one = "What about flutter?" (02/18/20)
// This will house our logic for our Spotify Endpoints
import axios from 'axios'
import { Buffer } from 'buffer'
import SpotifyCreds from 'Gruvee/Components/Auth/Creds/SpotifyCreds'
// Env Variables
import { ENVIRONMENT } from 'react-native-dotenv'
import { GET_API_TOKEN } from './EndpointConstants'

const baseHostName =
    ENVIRONMENT === 'PROD'
        ? 'https://us-central1-gruvee-3b7c4.cloudfunctions.net'
        : 'http://192.168.1.12:8080'

// POST: API Token Request
export const GetApiToken = code => {
    const credsB64 = Buffer.from(
        `${SpotifyCreds.clientId}:${SpotifyCreds.clientSecret}`
    ).toString('base64')

    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', SpotifyCreds.redirectUri)

    const headers = {
        Authorization: `Basic ${credsB64}`,
        'content-type': 'application/x-www-form-urlencoded',
    }

    const options = {
        method: 'POST',
        url: GET_API_TOKEN,
        headers,
        data: params,
    }

    // This already returns a promise
    return axios(options)
}

// POST: API Token Refresh
export const RefreshApiToken = async () => {
    console.log('Refreshing API Token for Spotify...')
}

// POST: Authorize Spotify User
export const AuthorizeUser = token => {
    const options = {
        method: 'POST',
        url: `${baseHostName}/authorizeWithSpotify`,
        data: {
            token,
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
        url: `${baseHostName}/generateCustomToken`,
        headers,
        data: { uid },
    }

    // This already returns a promise
    return axios(options)
}
