import { v4 as uuidv4 } from 'uuid'

export default class Playlist {
    /*
        id: 'playlist1',
        name: 'Cool Kids Music',
        createdBy: 'SomeMemberId' // This will be a user object
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song2', 'song3'],
        comments: {
            song1: ['comment2', 'comment5', 'comment7'],
            song2: ['comment1'],
            song3: ['comment0', 'comment5', 'comment6', 'comment3'],
        },
        coverArt: 'SomeBrokenImagePath',
    */

    constructor(name, members = [], createdBy = null) {
        const cleanedMembers = !members.length ? [createdBy.id] : [createdBy.id, ...members]

        this.id = uuidv4()
        this.name = name
        this.createdBy = createdBy.id
        this.members = cleanedMembers
        this.songs = { addedBy: {}, allSongs: [] }
        this.comments = {}
        this.coverArt = ''
    }
}
