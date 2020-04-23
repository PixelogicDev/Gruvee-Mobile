export const AddPlaylist = (playlist, statePlaylists) => {
    const byId = { ...statePlaylists.byId }
    byId[playlist.id] = playlist

    const allIds = [...statePlaylists.allIds, playlist.id]

    return { byId, allIds }
}

export const AddPlaylistMember = (memberId, playlistId, statePlaylists) => {
    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                members: [...statePlaylists.byId[playlistId].members, memberId],
            },
        },
    }
}

export const AddPlaylistSong = (user, songId, playlistId, statePlaylists) => {
    const songsAddedeBy = statePlaylists.byId[playlistId].songs.addedBy
    const updatedAddedByVal = songsAddedeBy[user.id]
        ? [...songsAddedeBy[user.id], songId]
        : [songId]

    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                songs: {
                    addedBy: {
                        ...statePlaylists.byId[playlistId].songs.addedBy,
                        [user.id]: updatedAddedByVal,
                    },
                    allSongs: [...statePlaylists.byId[playlistId].songs.allSongs, songId],
                },
                comments: {
                    ...statePlaylists.byId[playlistId].comments,
                    [songId]: [],
                },
            },
        },
    }
}

export const AddSongComment = (commentId, songId, playlistId, statePlaylists) => {
    const stateComments = statePlaylists.byId[playlistId].comments
    const updatedComments = Object.keys(stateComments).length
        ? { ...stateComments, [songId]: [...stateComments[songId], commentId] }
        : { [songId]: [commentId] }

    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                comments: {
                    ...updatedComments,
                },
            },
        },
    }
}

export const DeletePlaylist = (playlistId, playlists) => {
    // LiquoriceLion - "Add some logic here." (02/03/20)
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
export const DeletePlaylistSong = (songId, playlistId, userId, statePlaylists) => {
    // Delete Comments from playlist
    const comments = { ...statePlaylists.byId[playlistId].comments }
    delete comments[songId]

    // Remove song from addedBy object - If we are deleting that means it's the person who added the song
    // so find them, and filter the array
    const addedBy = { ...statePlaylists.byId[playlistId].songs.addedBy }
    const updatedAddBy = {
        ...addedBy,
        [userId]: addedBy[userId].filter(addedBySongId => addedBySongId !== songId),
    }

    // Filter allSongs array
    const updatedAllSongs = statePlaylists.byId[playlistId].songs.allSongs.filter(
        stateSongId => stateSongId !== songId
    )

    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                songs: { allSongs: updatedAllSongs, addedBy: updatedAddBy },
                comments,
            },
        },
    }
}

export const DeleteSongComment = (commentId, songId, playlistId, statePlaylists) => {
    return {
        ...statePlaylists,
        byId: {
            ...statePlaylists.byId,
            [playlistId]: {
                ...statePlaylists.byId[playlistId],
                comments: {
                    ...statePlaylists.byId[playlistId].comments,
                    [songId]: statePlaylists.byId[playlistId].comments[songId].filter(
                        stateCommentId => stateCommentId !== commentId
                    ),
                },
            },
        },
    }
}

// sillyonly - "well well! I have been UNLEASHED now" (02/13/20)
export const HydratePlaylists = (playlistsState, playlists) => {
    // Get user state playlists, map through IDs, and return
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

    reducedPlaylists.byId = {
        ...reducedPlaylists.byId,
    }
    reducedPlaylists.allIds = [...reducedPlaylists.allIds]

    return reducedPlaylists
}
