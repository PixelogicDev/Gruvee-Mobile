// Yiemorx - "The best god damn hiring manager - Yiemorx" (02/19/20)
// DrRayLV - "KappaPride" (06/05/20)
const spotifyIconAsset = require('Gruvee/assets/icons/social/spotify/icon.png')
const youtubeIconAsset = require('Gruvee/assets/icons/social/youtube/icon.png')
const appleIconAsset = require('Gruvee/assets/icons/social/apple/icon.png')

export const ApplePlatform = {
    id: 'apple',
    color: { primary: '#000', secondary: '#fff' },
    size: { width: 40, height: 44 },
    friendlyName: 'Apple',
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
