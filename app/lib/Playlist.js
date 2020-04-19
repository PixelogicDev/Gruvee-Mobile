import { v4 as uuidv4 } from 'uuid'

export default class Playlist {
    constructor(name, members = [], createdBy = null) {
        const cleanedMembers = !members.length ? [createdBy.id] : [createdBy.id, ...members]
        this.id = uuidv4()
        this.name = name
        this.createdBy = createdBy.id
        this.members = cleanedMembers
        this.songs = { addedBy: {}, allSongs: [] }
        this.comments = {}
        this.coverArt = null
    }
}
