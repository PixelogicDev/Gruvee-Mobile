export const AddSong = (newSong, stateSongs) => {
    return {
        ...stateSongs,
        byId: { ...stateSongs.byId, [newSong.id]: newSong },
        allIds: [...stateSongs.allIds, newSong.id],
    }
}

export const DeleteSongFromPlaylist = (playlists, playlistId, songId) => {
    const newPlaylists = playlists.map(playlist => {
        if (playlist.id === playlistId) {
            const filteredSongs = playlist.songs.filter(
                song => song.id !== songId
            )

            return {
                ...playlist,
                songs: filteredSongs,
            }
        }

        return playlist
    })

    return newPlaylists
}

export const FetchSongs = songs => {
    // At this point we will have our list of songs
    // Setup the flat state

    /*
        songs : {
		    byId: {
			    “songId”: {
				    songId: “songId”,
				    addedBy: “MemberId”, 
				    comments: [“123”, “456”]
				    …
			    }
		    },
		    allIds: [“1”, “2”, “3”]
	    },
    */

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    return songs.reduce(
        (state, currentSongs) => {
            return {
                byId: {
                    ...state.byId,
                    [currentSongs.id]: currentSongs,
                },
                allIds: [...state.allIds, currentSongs.id],
            }
        },
        { byId: {}, allIds: [] }
    )
}
