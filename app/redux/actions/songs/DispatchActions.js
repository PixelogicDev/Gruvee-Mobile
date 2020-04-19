export const AddSong = (newSong, stateSongs) => {
    const allIds =
        stateSongs.allIds.findIndex(id => newSong.id === id) === -1
            ? [...stateSongs.allIds, newSong.id]
            : [...stateSongs.allIds]

    return {
        ...stateSongs,
        byId: {
            ...stateSongs.byId,
            [newSong.id]: newSong,
        },
        allIds,
    }
}

// EmberCM - "How many comments have you got now?" (02/07/20)
export const DeleteSong = (songId, stateSongs) => {
    const byId = Object.entries(stateSongs.byId)
        .filter(([key]) => {
            return key !== songId
        })
        .reduce(
            (obj, [key, value]) => {
                return { ...obj, [key]: value }
            },
            // Will reduce the byId {}
            {}
        )

    return {
        ...stateSongs,
        byId,
        allIds: stateSongs.allIds.filter(stateSongId => stateSongId !== songId),
    }
}

export const FetchSongs = (songs, songsState) => {
    if (songs.length === 0) return songsState

    // If the song is already in state, don't set again
    const newSongs = songs.filter(song => !songsState.byId[song.id])

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    const reducedSongs = newSongs.reduce(
        (state, currentSongs) => {
            return {
                byId: {
                    ...state.byId,
                    [currentSongs.id]: currentSongs,
                },
                allIds: [...state.allIds, currentSongs.id],
            }
        },
        {
            byId: {},
            allIds: [],
        }
    )

    // sillyonly - "SWIFT IS THE LANGUAGE OF THE GODS!" (02/05/20)
    // estrangedHD - "Well what a same, I still need another one Kappa" (02/05/20)
    reducedSongs.byId = {
        ...reducedSongs.byId,
        ...songsState.byId,
    }
    reducedSongs.allIds = [...reducedSongs.allIds, ...songsState.allIds]

    return reducedSongs
}
