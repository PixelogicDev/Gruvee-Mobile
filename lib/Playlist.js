export default class Playlist {
    /*
        id: 'Playlist0' <String>,
        name: 'Cool Kids Music' <String>,
        members: 'Some, New, Name, Here' <String>
        numMembers: 1234 <Int>,
        numSongs: 7 <Int>,
        albumArtworkUrl: 'SomeBrokenImagePath'<String>,
    */
    constructor(name, members = '') {
        const randoNum = Math.floor(Math.random() * Math.floor(1000))

        this.id = name.replace(/\s/g, '') + randoNum
        this.name = name
        // Return signed in user at the moment thats "adilanchian"
        const cleanedMembers = !members.length
            ? ['adilanchian']
            : ['adilanchian', ...members.split(',').map(m => m.trim())]
        this.members = cleanedMembers
        this.songs = []
        this.albumArtworkUrl = 'SomeBrokenImagePath'
    }
}
