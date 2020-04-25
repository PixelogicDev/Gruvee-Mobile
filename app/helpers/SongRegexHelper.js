const spotifyLinkRegex = new RegExp(/^(https:\/\/[a-z]+.spotify.com\/)/)
const spotifyUriRegex = new RegExp(/^(spotify:)/)
const youtubeLinkRegex = new RegExp(/^^(https:\/\/www.youtube.com\/|https:\/\/youtube.com\/)/)
const youtubeShortLinkRegex = new RegExp(/^(https:\/\/youtu.be\/)/)
const youtubeMusicLinkRegex = new RegExp(/^(https:\/\/music.youtube.com\/)/)
const appleMusicLinkRegex = new RegExp(/^(https:\/\/[a-z]+.music.apple.com\/)/)

// OnePocketPimp - "For entertainment while coding: https://www.twitch.tv/pixelogicdev/clip/BluePoorPterodactylGivePLZ" (04/13/20)
// eslint-disable-next-line import/prefer-default-export
export const ParseMediaLink = mediaLink => {
    console.log('Parsing song link...')

    // WildDogHD - "The quick brown fox jumps over the lazy dog" (04/13/20)
    if (spotifyLinkRegex.test(mediaLink)) {
        // https://play.spotify.com/user/spotifydiscover/playlist/0vL3R9wDeAwmXTTuRATa14
        // http://spoti.fi/2fcACbx ---> Should probably test this out
        console.log(`Is valid spotify link: ${mediaLink}`)

        // Get id from uri
        const linkSplit = mediaLink.split('/') // Would split to see if it's a track/playlist/etc
        const mediaType = linkSplit[linkSplit.length - 2] // Would get the type of link it is (track, playlist, etc)
        const idSplit = linkSplit[linkSplit.length - 1].split('?') // Would split to get id
        const mediaId = idSplit[0] // Would get us the id

        return { provider: 'spotify', mediaId, mediaType }
    }

    if (spotifyUriRegex.test(mediaLink)) {
        console.log(`Is valid spotify uri: ${mediaLink}`)

        const uriSplit = mediaLink.split(':')
        const mediaType = uriSplit[1]
        const mediaId = uriSplit[uriSplit.length - 1]

        return { provider: 'spotify', mediaId, mediaType }
    }

    if (youtubeLinkRegex.test(mediaLink) || youtubeMusicLinkRegex.test(mediaLink)) {
        console.log(`Is valid Youtube Video link: ${mediaLink}`)
        // If we land here, this is a video we want to use the video list api
        // https://www.youtube.com/watch?v=7QoSF6JrZXw If it's this we need to use Videos API
        // https://www.youtube.com/playlist?list=PL_fXgW9VVKrxap-itp9szun8Eua-ET7t2 If it's this we need to use playlist API
        // https://music.youtube.com/watch?v=jjwilAja7Lc&feature=share

        // Match params
        const paramsMatch = mediaLink.match(/\/\w+\?(.*)/)
        if (paramsMatch === null) {
            return null
        }

        const params = paramsMatch[1]
        let mediaId = null
        let mediaType

        const videoParamMatch = params.match(/v=(.*)/)
        if (videoParamMatch !== null) {
            const videoId = videoParamMatch[1]
            if (videoId) {
                console.log(`Found video param: ${videoId}`)
                mediaId = videoId
                mediaType = 'video'
            }
        }

        const listParamMatch = params.match(/list=(.*)/)
        if (listParamMatch !== null) {
            const listId = listParamMatch[1]
            if (listId) {
                console.log(`Found playlist id param: ${listId}`)
                mediaId = listId
                mediaType = 'playlist'
            }
        }

        // Check for '&feaure' here
        const featureQuery = mediaId.split(/&feature=(.*)/)
        // eslint-disable-next-line prefer-destructuring
        mediaId = featureQuery[0]

        return mediaId === null ? null : { provider: 'youtube', mediaId, mediaType }
    }

    if (youtubeShortLinkRegex.test(mediaLink)) {
        // GET https://www.googleapis.com/youtube/v3/videos
        // https://youtu.be/O59JNz7rdIU
        console.log(`Is valid youtube partial link: ${mediaLink}`)
        const splitLink = mediaLink.split('/')
        const mediaId = splitLink[splitLink.length - 1]

        return { provider: 'youtube', mediaId, mediaType: 'video' }
    }

    if (appleMusicLinkRegex.test(mediaLink)) {
        // https://geo.music.apple.com/us/album/pray-4-love/1504192331?mt=1&app=music
        console.log(`Is valid Apple Music uri: ${mediaLink}`)
        const linkSplit = mediaLink.split('/')
        const mediaType = linkSplit[linkSplit.length - 3]
        const idSplit = linkSplit[linkSplit.length - 1]
        const querySplit = idSplit.split('?')
        const mediaId = querySplit[0]

        return { provider: 'apple', mediaId, mediaType }
    }

    return null
}
