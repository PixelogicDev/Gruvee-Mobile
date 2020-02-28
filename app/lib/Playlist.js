export default class Playlist {
    /*
        id: 'playlist1',
        name: 'Cool Kids Music',
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song2', 'song3'],
        comments: {
            song1: ['comment2', 'comment5', 'comment7'],
            song2: ['comment1'],
            song3: ['comment0', 'comment5', 'comment6', 'comment3'],
        },
        albumArtworkUrl: 'SomeBrokenImagePath',
    */

    constructor(name, members = '') {
        const randoNum = Math.floor(Math.random() * Math.floor(1000))

        this.id = `${name.replace(/\s/g, '')}-${randoNum}`
        this.name = name
        // Return signed in user at the moment thats "adilanchian"
        const cleanedMembers = !members.length
            ? ['adilanchian']
            : ['adilanchian', ...members.split(',').map(m => m.trim())]
        this.members = cleanedMembers
        this.songs = []
        this.comments = {}
        this.albumArtworkUrl = 'SomeBrokenImagePath'
    }
}
