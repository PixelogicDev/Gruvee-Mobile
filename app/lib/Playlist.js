import { v4 as uuidv4 } from 'uuid'

export default class Playlist {
    /*
        id: 'playlist1',
        name: 'Cool Kids Music',
        createdBy: 'GruveeGuy' // This will need to be memberIds
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song2', 'song3'],
        comments: {
            song1: ['comment2', 'comment5', 'comment7'],
            song2: ['comment1'],
            song3: ['comment0', 'comment5', 'comment6', 'comment3'],
        },
        albumArtworkUrl: 'SomeBrokenImagePath',
    */

    constructor(name, members = '', createdBy = '') {
        this.id = uuidv4()
        this.name = name
        this.createBy = createdBy
        const cleanedMembers = !members.length
            ? [createdBy] // This should be a User Object when we get to setting this up
            : [createdBy, ...members.split(',').map(m => m.trim())]
        this.members = cleanedMembers
        this.songs = []
        this.comments = {}
        this.albumArtworkUrl = ''
    }
}
