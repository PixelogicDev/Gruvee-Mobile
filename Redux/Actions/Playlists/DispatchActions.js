// eslint-disable-next-line import/prefer-default-export
export const FetchPlaylists = playlists => {
    // Setup the flat state
    /*
        playlists: {
            byId: {
                “playlistId”: {
                    playlistId: “bla”,
                    members: [“456”, “789”], // MemberIds
                    songs: [“123”, “456”] // SongIds
                }
            },
		    allIds: [“1”, “2”, “3”]
	    }
    */

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    return playlists.reduce(
        (state, currentPlaylist) => {
            return {
                byId: {
                    ...state.byId,
                    [currentPlaylist.id]: currentPlaylist,
                },
                allIds: [...state.allIds, currentPlaylist.id],
            }
        },
        { byId: {}, allIds: [] }
    )
}
