/*
    - Make request to db based on user id to get playlists
    User
    {
        id: "1234",
        playlists: ["playlist1", "playlist2", "playlist3"]
    }
*/

export default [
    {
        id: 'playlist1',
        name: 'Cool Kids Music',
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song2', 'song3'],
        albumArtworkUrl: 'SomeBrokenImagePath',
    },
    {
        id: 'playlist2',
        name: "YaBoi Alec's Playlist",
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song3'],
        albumArtworkUrl:
            'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930',
    },
    {
        id: 'playlist3',
        name: 'Y A G',
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song3'],
        albumArtworkUrl: 'https://i.imgur.com/uoMh2y3.png',
    },
]
