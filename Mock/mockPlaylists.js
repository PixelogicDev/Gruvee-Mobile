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
        members: ['memberYaBoi-3456', 'memberAlec-1234', 'memberWasHere-890'], // MemberIds
        songs: ['song1', 'song2', 'song3'],
        // Each song has an array of commentIds to pull from state
        comments: {
            song1: ['comment2member-YaBoi'],
            song2: ['comment1-memberAlec'],
            song3: [],
        },
        albumArtworkUrl: 'SomeBrokenImagePath',
    },
    {
        id: 'playlist2',
        name: "YaBoi Alec's Playlist",
        members: ['memberYaBoi-3456', 'memberAlec-1234', 'memberWasHere-890'], // MemberIds
        songs: ['song3'],
        // Each song has an array of commentIds to pull from state
        comments: { song3: ['comment3-memberWasHere'] },
        albumArtworkUrl:
            'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930',
    },
    {
        id: 'playlist3',
        name: 'Y A G',
        members: ['memberYaBoi-3456', 'memberAlec-1234', 'memberWasHere-890'], // MemberIds
        songs: ['song1', 'song3'],
        // Each song has an array of commentIds to pull from state
        comments: {
            song1: ['comment4-memberYaBoi', 'comment7-memberAlec'],
            song3: ['comment5-memberAlec'],
        },
        albumArtworkUrl: 'https://i.imgur.com/uoMh2y3.png',
    },
]
