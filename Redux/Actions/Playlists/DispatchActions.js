export const AddPlaylist = (playlist, statePlaylists) => {
    const byId = { ...statePlaylists.byId }
    byId[playlist.id] = playlist

    const allIds = [...statePlaylists.allIds, playlist.id]

    return { byId, allIds }
}

export const DeletePlaylist = (playlistId, playlists) => {
    // LiquoriceLion - "Add some logic here." (02/03/20)
    // Filter out allIds to remove playlistId
    // Permafrost1991 - "Finger guns will never die! -Alec 2019" (02/06/20)
    // dra031cko - "Another One" (02/06/20)
    const allIds = playlists.allIds.filter(id => id !== playlistId)
    const byId = {
        ...playlists.byId,
    }
    delete byId[playlistId]

    return {
        byId,
        allIds,
    }
}

// sillyonly - "Here we go again!" (02/06/20)
export const DeletePlaylistSong = (songId, playlistId, statePlaylists) => {
    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                songs: statePlaylists.byId[playlistId].songs.filter(
                    stateSongId => stateSongId !== songId
                ),
            },
        },
    }
}

export const FetchPlaylists = (playlistsState, playlists) => {
    if (playlists.length === 0) return playlistsState

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    const reducedPlaylists = playlists.reduce(
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

    reducedPlaylists.byId = { ...reducedPlaylists.byId, ...playlistsState.byId }
    reducedPlaylists.allIds = [
        ...reducedPlaylists.allIds,
        ...playlistsState.allIds,
    ]

    return reducedPlaylists
}

export const UpdatePlaylistSongs = (songId, playlistId, statePlaylists) => {
    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                songs: [...statePlaylists.byId[playlistId].songs, songId],
            },
        },
    }
}
