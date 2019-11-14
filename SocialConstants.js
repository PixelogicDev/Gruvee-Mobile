const spotifyIconAsset = require('Gruvee/Assets/Icons/Social/spotify_icon.png')
const youtubeIconAsset = require('Gruvee/Assets/Icons/Social/youtube_icon.png')

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

export const SOCIAL_PLATFORMS = [spotify, youtube]
