/*
    
    id: 'song1',
    addedBy: 'memberYaBoi',
    name: 'SomeCoolNewSong',
    artist: 'YaBoiAlec',
    album: 'Album of The Year',
    albumArtwork: 'SomeBadLink',
    platformDeepLink:
        'https://open.spotify.com/track/4lnmdAWAhVdmbDBEC4gy0d?si=U0nL2FaYR3Ch41m8MgtS1w',
    
*/

export default class Song {
    constructor(songBlob, link) {
        // Desconstruct json
        this.deconstructSongBlob(songBlob, link)
    }

    // Helpers
    deconstructSongBlob(songBlob, link) {
        this.id = `${songBlob.id}-${link.replace(/\s/g, '')}`
        // TODO: Get current user signed in
        this.addedBy = 'adilanchian'
        this.name = songBlob.name
        this.artist = songBlob.artists.map(a => a.name).join(',')
        this.album = songBlob.album.name
        const albumImages = songBlob.album.images
        // Since albuArtwork is ordered by image size, get
        // the second to last image
        this.albumArtwork =
            albumImages && albumImages.length ? albumImages[albumImages.length - 2].url : undefined
        this.platformDeepLink = link
    }
}
