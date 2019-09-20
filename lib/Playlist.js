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

        this.id = name + randoNum
        this.name = name
        this.members = members.split(',').map(m => m.trim())
        this.numMembers = this.members.length
        this.numSongs = 0
        this.albumArtworkUrl = 'SomeBrokenImagePath'
    }

    // Using just for now while we mock things out
    toJson() {
        return {
            id: this.id,
            name: this.name,
            members: this.members,
            numMembers: this.numMembers,
            numSongs: this.numSongs,
            albumArtworkUrl: this.albumArtworkUrl,
        }
    }
}
