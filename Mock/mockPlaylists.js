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
    - Comments
        - Add new comment
            - In our playlists, find the song that this comment should be associated with and add data to comments array
        - Delete a comment
            - In our playlist, find song associated with this comment and remove the id from comments array
*/

export default [
    {
        id: 'playlist1',
        name: 'Cool Kids Music',
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song1', 'song2', 'song3'],
        // Each song has an array of commentIds to pull from state
        comments: {
            song1: ['comment2', 'comment5', 'comment7'],
            song2: ['comment1'],
            song3: ['comment0', 'comment5', 'comment6', 'comment3'],
        },
        albumArtworkUrl: 'SomeBrokenImagePath',
    },
    {
        id: 'playlist2',
        name: "YaBoi Alec's Playlist",
        members: ['memberYaBoi', 'memberAlec', 'memberWasHere'], // MemberIds
        songs: ['song3'],
        // Each song has an array of commentIds to pull from state
        comments: { song3: ['comment5', 'comment6', 'comment7'] },
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
            song1: ['comment3', 'comment4', 'comment5'],
            song3: ['comment0'],
        },
        albumArtworkUrl: 'https://i.imgur.com/uoMh2y3.png',
    },
]
