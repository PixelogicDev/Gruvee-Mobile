import axios from 'axios'
import { COMMON_ENDPOINTS } from 'Gruvee/service/endpointConstants'

// POST: Create Playlist On Preferred Social Platform
// eslint-disable-next-line import/prefer-default-export
export const CreateSocialPlaylist = (socialPlatform, playlist) => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.createSocialPlaylist,
        headers,
        data: { socialPlatform, playlist },
    }

    // This already returns a promise
    return axios(options)
}

// POST: Create Social Platform and store in DB
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

// POST: Create User and store in DB
export const CreateUser = user => {
    const headers = {
        'User-Type': 'gruvee-mobile',
    }

    const options = {
        method: 'POST',
        url: COMMON_ENDPOINTS.createUser,
        headers,
        data: user,
    }

    // This already returns a promise
    return axios(options)
}
