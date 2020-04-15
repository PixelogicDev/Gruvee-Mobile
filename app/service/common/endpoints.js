import axios from 'axios'
import { COMMON_ENDPOINTS } from 'Gruvee/service/endpointConstants'
import { ParseSongLink } from 'Gruvee/helpers/SongRegexHelper'

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

export const GetSongMetadata = songLink => {
    console.log('Starting GetSongMetadata Service')

    // This will retrun: {id: string, mediaType: string}
    // Get spotify data
    const metadata = ParseSongLink(songLink)
    if (metadata !== null) {
        console.log(metadata.provider)
        console.log(metadata.id)
        console.log(metadata.mediaType)
    } else {
        console.log('SongLink returned nil')
        return null
    }

    // Call function to get metadata for song based on provider
    switch (metadata.provider) {
        case 'spotify':
            console.log('Calling Spotify')
            break
        case 'youtube':
            console.log('Calling Youtube')
            break
        case 'apple':
            console.log('Calling Apple')
            break
        default:
            console.log(`${metadata.provider} is not supported`)
    }

    // Create new song document for playlist
    // When song is added to collection, service should trigger function to get data for other platforms
}
