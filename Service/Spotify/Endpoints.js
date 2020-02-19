// no_neon_one = "What about flutter?" (02/18/20)
// This will house our logic for our Spotify Endpoints
import axios from 'axios'
import { Buffer } from 'buffer'
import SpotifyCreds from 'Gruvee/Components/Auth/Creds/SpotifyCreds'
import { GET_API_TOKEN, GET_CURRENT_USER } from './EndpointConstants'

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

// GET: Get Spotify User
export const GetCurrentUser = async token => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }

        const options = {
            method: 'GET',
            headers,
            url: GET_CURRENT_USER,
        }

        const response = await axios(options)
    } catch (err) {
        console.error(err)
    }
}
