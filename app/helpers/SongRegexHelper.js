const spotifyUriRegex = new RegExp(/^(spotify:|https:\/\/[a-z]+.spotify.com\/)/)
const youtubeMusicUriRegex = new RegExp(/^(https:\/\/music.youtube.com\/)/)
const appleMusicUriRegex = new RegExp(/^(https:\/\/geo.music.apple.com\/)/)

// eslint-disable-next-line import/prefer-default-export
export const ParseSongUri = uri => {
    console.log('Parsing song URI')

    if (spotifyUriRegex.test(uri)) {
        console.log(`Is valid spotify uri: ${uri}`)
    } else if (youtubeMusicUriRegex.test(uri)) {
        console.log(`Is valid Youtube uri: ${uri}`)
    } else if (appleMusicUriRegex.test(uri)) {
        console.log(`Is valid Apple Music uri: ${uri}`)
    }
}
