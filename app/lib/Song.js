// TODO: Rename things to match up with firebase function
export default class Song {
    constructor(mediaBlob) {
        this.id = mediaBlob.id
        this.name = mediaBlob.name
        this.creator = mediaBlob.creator
        this.album = mediaBlob.album ? mediaBlob.album : ''
        this.images = mediaBlob.images
        this.type = mediaBlob.type
        this.externalUrls = mediaBlob.externalUrls
    }
}
