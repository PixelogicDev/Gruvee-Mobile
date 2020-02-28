const spotifyIconAsset = require('Gruvee/assets/icons/social/spotify_icon.png')
const youtubeIconAsset = require('Gruvee/assets/icons/social/youtube_icon.png')
const appleIconAsset = require('Gruvee/assets/icons/social/apple_icon.png')

const spotify = {
    id: 'spotify',
    color: { primary: '#648F01', secondary: '#FFFFFF' },
    size: { width: 25, height: 25 },
    friendlyName: 'Spotify',
    glyphPath: spotifyIconAsset,
}

const youtube = {
    id: 'youtube',
    color: { primary: '#FF0000', secondary: '#FFFFFF' },
    size: { width: 25, height: 25 },
    friendlyName: 'YouTube',
    glyphPath: youtubeIconAsset,
}

const apple = {
    id: 'apple',
    color: { primary: '#000', secondary: '#fff' },
    size: { width: 25, height: 25 },
    friendlyName: 'Apple Music',
    glyphPath: appleIconAsset,
}

export default [spotify, youtube, apple]
