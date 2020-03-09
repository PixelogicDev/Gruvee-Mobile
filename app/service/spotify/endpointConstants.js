// This will include our actual endpoint addresses
const apiHostname = 'https://api.spotify.com'
const accountsHostname = 'https://accounts.spotify.com'

// Accounts Services
export const GET_API_TOKEN = `${accountsHostname}/api/token`

export const GET_AUTHORIZATION_CODE = (clientId, scopes, redirectUri) =>
    `${accountsHostname}/authorize?response_type=code&client_id=${clientId}${
        scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
    }&redirect_uri=${redirectUri}`.trim()

// API Services
export const GET_CURRENT_USER = `${apiHostname}/v1/me`
