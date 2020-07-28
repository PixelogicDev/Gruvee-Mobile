import { v4 as uuidv4 } from 'uuid'

/**
 * Song defines the song object that lives in Firestore and includes all the data for each provider
 * @param mediaBlob Object that defines a Firestore media object
 * @property `name` String that is the song name
 * @property `album` String that is the album name
 * @property `type` String that is the type of media (track, album, playlist)
 * @property `creator` String that is the artist(s)
 * @property `apple` Object that contains the Apple Music track id and url
 * @property `spotify` Object contains the Spotify track id and url
 * @property `youtube` #ComingSoon
 */
export default class Song {
    constructor(mediaBlob) {
        this.id = uuidv4()
        this.name = mediaBlob.name
        this.album = mediaBlob.album
        this.type = mediaBlob.type
        this.creator = mediaBlob.creator
        this.apple = mediaBlob.apple
        this.spotify = mediaBlob.spotify
        this.youtube = mediaBlob.youtube
    }
}
