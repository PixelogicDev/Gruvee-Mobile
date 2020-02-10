/*
    - Make request to db based on user id to get playlists
    User
    {
        id: "1234",
        playlists: ["playlist1", "playlist2", "playlist3"]
    }
*/

/*
    - Playlists
        - New Playlist: 
            - Create a comments object that has a key/value pair of songId: [CommentIds]
        - Delete Playlist:
            - Remove comments in our state based on the comments object
    - Songs
        - Add new song
            - In our playlists, we need to add our key/value pair of songId: []
        - Delete a song
            - In our playlist, we need to go and remove the song comments from our comments object && from state
*/

export default [
    {
        id: 'playlist1',
        name: 'Cool Kids Music',
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
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
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song3'],
        // Each song has an array of commentIds to pull from state
        comments: { song3: ['comment3-memberWasHere'] },
        albumArtworkUrl:
            'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930',
    },
    {
        id: 'playlist3',
        name: 'Y A G',
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song3'],
        // Each song has an array of commentIds to pull from state
        comments: {
            song1: ['comment4-memberYaBoi', 'comment7-memberAlec'],
            song3: ['comment5-memberAlec'],
        },
        albumArtworkUrl: 'https://i.imgur.com/uoMh2y3.png',
    },
]
