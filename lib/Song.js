/*
    id: 'song0',
    addedBy: 'SomeOtherMember',
    name: 'SomeCoolNewSong',
    artist: 'YaBoiAlec',
    album: 'Album of The Year',
    albumArtwork: 'SomeBadLink',
    platformDeepLink: 'spotify://SomeDeepLink',
    comments: [
        'WOW SO GOOD.',
        'This could be better...',
        'Whats with the album name...',
    ]
*/

import SongComment from './SongComment'

export default class Song {
    constructor(songBlob, link, comment) {
        // Desconstruct json
        this.deconstructSongBlob(songBlob, link, comment)
    }

    // Helpers
    deconstructSongBlob(songBlob, link, comment) {
        this.id = `${songBlob.id}-${link}`
        // TODO: Get current user signed in
        this.addedBy = 'adilanchian'
        this.name = songBlob.name
        this.artist = songBlob.artists.map(a => a.name).join(',')
        this.album = songBlob.album.name
        const albumImages = songBlob.album.images
        // Since albuArtwork is ordered by image size, get
        // the second to last image
        this.albumArtwork =
            albumImages && albumImages.length
                ? albumImages[albumImages.length - 2].url
                : undefined
        this.platformDeepLink = link
        this.comments =
            comment !== '' ? [new SongComment(comment, 'adilanchian')] : []
    }
}
