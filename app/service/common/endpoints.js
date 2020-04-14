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
    const { id, mediaType } = ParseSongLink(songLink)

    console.log(id)
    console.log(mediaType)

    // Get spotify data
    // GetSpotifyTrack('1234')
    // Create new song document for playlist
    // When song is added to collection, service should trigger function to get data for other platforms

    // Get setup some sort of regex filter, and grab the filter
}
