import { GetSpotifyTrack } from 'Gruvee/service/spotify/endpoints'

const spotifyLinkRegex = new RegExp(/^(https:\/\/[a-z]+.spotify.com\/)/)
const spotifyUriRegex = new RegExp(/^(spotify:)/)
const youtubeLinkRegex = new RegExp(/^^(https:\/\/www.youtube.com\/|https:\/\/youtube.com\/)/)
const youtubePartialLinkRegex = new RegExp(/^(https:\/\/youtu.be\/)/)
const youtubeMusicLinkRegex = new RegExp(/^(https:\/\/music.youtube.com\/)/)
const appleMusicUriRegex = new RegExp(/^(https:\/\/[a-z]+.music.apple.com\/)/)

// OnePocketPimp - "For entertainment while coding: https://www.twitch.tv/pixelogicdev/clip/BluePoorPterodactylGivePLZ" (04/13/20)
// eslint-disable-next-line import/prefer-default-export
export const ParseSongLink = songLink => {
    console.log('Parsing song URI...')

    // WildDogHD - "The quick brown fox jumps over the lazy dog" (04/13/20)
    if (spotifyLinkRegex.test(songLink)) {
        // https://play.spotify.com/user/spotifydiscover/playlist/0vL3R9wDeAwmXTTuRATa14
        console.log(`Is valid spotify link: ${songLink}`)

        // Get id from uri
        const linkSplit = songLink.split('/') // Would split to see if it's a track/playlist/etc
        const mediaType = linkSplit[linkSplit.length - 2] // Would get the type of link it is (track, playlist, etc)
        const idSplit = linkSplit[linkSplit.length - 1].split('?') // Would split to get id
        const id = idSplit[0] // Would get us the id

        return { provider: 'spotify', id, mediaType }
    }

    if (spotifyUriRegex.test(songLink)) {
        console.log(`Is valid spotify uri: ${songLink}`)

        const uriSplit = songLink.split(':')
        const mediaType = uriSplit[1]
        const id = uriSplit[uriSplit.length - 1]

        return { provider: 'spotify', id, mediaType }
    }

    if (youtubeLinkRegex.test(songLink) || youtubeMusicLinkRegex.test(songLink)) {
        console.log(`Is valid Youtube Video link: ${songLink}`)
        // If we land here, this is a video we want to use the video list api
        // https://www.youtube.com/watch?v=7QoSF6JrZXw If it's this we need to use Videos API
        // https://www.youtube.com/playlist?list=PL_fXgW9VVKrxap-itp9szun8Eua-ET7t2 If it's this we need to use playlist API
        // https://music.youtube.com/watch?v=jjwilAja7Lc&feature=share

        // Match params
        const paramsMatch = songLink.match(/\/\w+\?(.*)/)
        if (paramsMatch === null) {
            return null
        }

        const params = paramsMatch[1]
        let id = null
        let mediaType

        const videoParamMatch = params.match(/v=(.*)/)
        if (videoParamMatch !== null) {
            const videoId = videoParamMatch[1]
            if (videoId) {
                console.log(`Found video param: ${videoId}`)
                id = videoId
                mediaType = 'video'
            }
        }

        const listParamMatch = params.match(/list=(.*)/)
        if (listParamMatch !== null) {
            const listId = listParamMatch[1]
            if (listId) {
                console.log(`Found playlist id param: ${listId}`)
                id = listId
                mediaType = 'playlist'
            }
        }

        // Check for '&feaure' here
        const featureQuery = id.split(/&feature=(.*)/)
        // eslint-disable-next-line prefer-destructuring
        id = featureQuery[0]

        return id === null ? null : { provider: 'youtube', id, mediaType }
    }

    if (youtubePartialLinkRegex.test(songLink)) {
        // GET https://www.googleapis.com/youtube/v3/videos
        // https://youtu.be/O59JNz7rdIU
        console.log(`Is valid youtube partial link: ${songLink}`)
        const splitLink = songLink.split('/')
        const id = splitLink[splitLink.length - 1]

        return { provider: 'youtube', id, mediaType: 'video' }
    }

    if (appleMusicUriRegex.test(songLink)) {
        // https://geo.music.apple.com/us/album/pray-4-love/1504192331?mt=1&app=music
        console.log(`Is valid Apple Music uri: ${songLink}`)
        const linkSplit = songLink.split('/')
        const mediaType = linkSplit[linkSplit.length - 3]
        const idSplit = linkSplit[linkSplit.length - 1]
        const querySplit = idSplit.split('?')
        const id = querySplit[0]

        return { provider: 'apple', id, mediaType }
    }

    return null
}
