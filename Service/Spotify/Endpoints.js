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
        : 'http://localhost:8080'

// POST: API Token Request
export const GetApiToken = async code => {
    try {
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
            headers,
            data: params,
            url: GET_API_TOKEN,
        }

        const response = await axios(options)
        console.log('We got the token.')
        return Promise.resolve(response.data)

        // We have API Token
        // Now, we can get username or spotify user id and create Firebase User
        // Also need to create user state redux object with token info

        /*
            access_token: 
            token_type:
            expires_in: 
            refresh_token:
            scope:
        */
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}

// POST: API Token Refresh
export const RefreshApiToken = async () => {
    console.log('Refreshing API Token for Spotify...')
}

// POST: Authorize Spotify User
export const AuthorizeUser = async token => {
    let result
    try {
        const options = {
            method: 'POST',
            data: {
                token,
            },
            url: `${baseHostName}/authorizeWithSpotify`,
        }

        const response = await axios(options)
        result = Promise.resolve(response.data)
    } catch (error) {
        result = Promise.reject(error.response)
    }

    return result
}

// KociQQ: Comment - "Found on StackOverflow, don't trust this code" (02/25/20)
// GET: Get Custom Firebase Token
export const GetCustomFirebaseToken = async uid => {
    let result

    try {
        const headers = {
            'User-Type': 'gruvee-mobile',
        }

        const options = {
            method: 'POST',
            headers,
            url: `${baseHostName}/generateCustomToken`,
            data: { uid },
        }

        const response = await axios(options)
        result = Promise.resolve(response.data)
    } catch (error) {
        result = Promise.reject(error)
    }

    return result
}
