const spotifyIconAsset = require('Gruvee/Assets/Icons/Social/spotify_icon.png')
const youtubeIconAsset = require('Gruvee/Assets/Icons/Social/youtube_icon.png')
const appleIconAsset = require('Gruvee/Assets/Icons/Social/apple_icon.png') // placeholder

// eslint-disable-next-line import/prefer-default-export
export const ApplePlatform = {
    id: 'apple',
    color: { primary: '#000', secondary: '#fff' },
    size: { width: 25, height: 25 },
    friendlyName: 'Apple Music',
    glyphPath: appleIconAsset,
}

export const SpotifyPlatform = {
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
