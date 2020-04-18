export default class Song {
    constructor(mediaBlob) {
        this.id = mediaBlob.id
        this.name = mediaBlob.name
        this.artist = mediaBlob.artists
            .map(a => a.name)
            .join(', ')
            .trim()
        this.album = mediaBlob.album ? mediaBlob.album.name : undefined
        const albumImages = mediaBlob.album ? mediaBlob.album.images : mediaBlob.images
        // Since albuArtwork is ordered by image size, get
        // the second to last image
        this.albumArtwork =
            albumImages && albumImages.length ? albumImages[albumImages.length - 2].url : undefined
        this.type = mediaBlob.type
        this.externalUrls = mediaBlob.external_urls
    }
}
