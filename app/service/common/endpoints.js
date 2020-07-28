import axios from 'axios'
import {
    COMMON_ENDPOINTS,
    SPOTIFY_ENDPOINTS,
    APPLE_ENDPOINTS,
} from 'Gruvee/service/endpointConstants'

/**
 * POST: Create Playlist On Preferred Social Platform
 * @param {object} socialPlatform SocialPlatform of signed in user
 * @param {string} playlistName Playlist name of playlist to be created
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const CreateSocialPlaylist = (socialPlatform, playlistName) => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.createSocialPlaylist,
        headers,
        data: { socialPlatform, playlistName },
    }

    // This already returns a promise
    return axios(options)
}

/**
 * POST: Create Social Platform and store in DB
 * @param {object} socialPlatform SocialPlatform of signed in user
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const CreateSocialPlatform = socialPlatform => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.createSocialPlatform,
        headers,
        data: socialPlatform,
    }

    // This already returns a promise
    return axios(options)
}

/**
 * POST: Create User and store in DB
 * @param {object} createUserReq User object that will be stored in Firestore
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const CreateUser = createUserReq => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.createUser,
        headers,
        data: createUserReq,
    }

    return axios(options)
}

/**
 * POST: Create Provider User and store in DB
 * @param {object} createProviderUserRequest Includes FirebaseProviderUID and PlatformProviderUID
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const CreateProviderUser = createProviderUserRequest => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.createProviderUser,
        headers,
        data: createProviderUserRequest,
    }

    return axios(options)
}

/**
 * GET: Get media date for specific service
 * @param {object} metadata Object that includes song information
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const GetMediaData = metadata => {
    if (metadata === null) {
        console.log('SongLink returned null')
        return null
    }

    let providerUrl

    // Call function to get metadata for song based on provider
    switch (metadata.provider) {
        case 'spotify':
            providerUrl = SPOTIFY_ENDPOINTS.getSpotifyMedia
            console.log('Calling Spotify')
            break
        case 'youtube':
            providerUrl = ''
            console.log('Calling Youtube')
            break
        case 'apple':
            providerUrl = APPLE_ENDPOINTS.getAppleMedia
            console.log('Calling Apple')
            break
        default:
            console.log(`${metadata.provider} is not supported`)
    }

    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: providerUrl,
        headers,
        data: metadata,
    }

    return axios(options)
}

/**
 * POST: Get whether user with given UID already has a doc in Firebase
 * @param {string} uid User's ID
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const GetDoesUserDocExist = uid => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.doesUserDocExist,
        headers,
        data: { uid },
    }

    return axios(options)
}

/**
 * POST: Get whether the given username is available or not
 * @param {string} username Desired username
 * @returns {Promise<any>} AxiosPromise with call data
 */
export const GetIsUsernameAvailable = username => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.isUsernameAvailable,
        headers,
        data: { username },
    }

    return axios(options)
}

// KociQQ: Comment - "Found on StackOverflow, don't trust this code" (02/25/20)
/**
 * GET: Get Custom Firebase Token
 * @param {string} uid User's Id
 * @returns {Promise<any>} AxiosPromise with call data
 */
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
