import axios from 'axios'
import { COMMON_ENDPOINTS, SPOTIFY_ENDPOINTS } from 'Gruvee/service/endpointConstants'

// POST: Create Playlist On Preferred Social Platform
// eslint-disable-next-line import/prefer-default-export
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

export const GetMediaData = metadata => {
    if (metadata === null) {
        console.log('SongLink returned nil')
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
            providerUrl = ''
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
