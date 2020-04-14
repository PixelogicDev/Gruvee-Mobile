import { GetSpotifyTrack } from 'Gruvee/service/spotify/endpoints'

const spotifyLinkRegex = new RegExp(/^(https:\/\/[a-z]+.spotify.com\/)/)
const spotifyUriRegex = new RegExp(/^(spotify:)/)
const youtubeLinkRegex = new RegExp(
    /^^(https:\/\/www.youtube.com\/|https:\/\/youtube.com\/|https:www.youtu.be.com\/|https:\/\/youtu.be\/)/
)
const youtubeMusicLinkRegex = new RegExp(/^(https:\/\/music.youtube.com\/)/)
const appleMusicUriRegex = new RegExp(/^(https:\/\/[a-z]+.music.apple.com\/)/)

// OnePocketPimp - "For entertainment while coding: https://www.twitch.tv/pixelogicdev/clip/BluePoorPterodactylGivePLZ" (04/13/20)
// eslint-disable-next-line import/prefer-default-export
export const ParseSongLink = songLink => {
    console.log('Parsing song URI')

    // WildDogHD - "The quick brown fox jumps over the lazy dog" (04/13/20)
    if (spotifyLinkRegex.test(songLink)) {
        console.log(`Is valid spotify link: ${songLink}`)

        // Get id from uri
        const linkSplit = songLink.split('/') // Would split to see if it's a track/playlist/etc
        const mediaType = linkSplit[linkSplit.length - 2] // Would get the type of link it is (track, playlist, etc)
        const idSplit = linkSplit[linkSplit.length - 1].split('?') // Would split to get id
        const id = idSplit[0] // Would get us the id

        return { id, mediaType }
    }

    if (spotifyUriRegex.test(songLink)) {
        console.log(`Is valid spotify uri: ${songLink}`)

        const uriSplit = songLink.split(':')
        const mediaType = uriSplit[1]
        const id = uriSplit[uriSplit.length - 1]

        return { id, mediaType }
    }

    if (youtubeLinkRegex.test(songLink)) {
    }

    if (youtubeMusicLinkRegex.test(songLink)) {
        // https://youtu.be/O59JNz7rdIU
        // https://www.youtube.com/watch?v=7QoSF6JrZXw
        // https://music.youtube.com/watch?v=jjwilAja7Lc&feature=share
        // https://music.youtube.com/playlist?list=PL4fGSI1pDJn5kI81J1fYWK5eZRl1zJ5kM
        // GET https://www.googleapis.com/youtube/v3/playlists

        console.log(`Is valid Youtube uri: ${songLink}`)
    }

    if (appleMusicUriRegex.test(songLink)) {
        console.log(`Is valid Apple Music uri: ${songLink}`)
    }
}
