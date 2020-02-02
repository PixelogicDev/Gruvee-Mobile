// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
export const AddPlaylistAction = (currentPlaylists, newPlaylist) => {
    return [...currentPlaylists, newPlaylist]
}

export const DeletePlaylistAction = (currentPlaylists, playlistIdToRemove) => {
    return currentPlaylists.filter(
        playlist => playlist.id !== playlistIdToRemove
    )
}

// Helpers
export const MapPlaylistsFromUser = state => {
    const playlists = []
    const playlistsIds = state.PlaylistsDataReducer.playlists.allIds
    if (playlistsIds === undefined) return playlists

    // Get all playlists for signed in user, but at this point we should already have the playlistIds
    playlistsIds.forEach(playlistId => {
        const playlist = state.PlaylistsDataReducer.playlists.byId[playlistId]
        if (playlist !== undefined) {
            playlists.push(playlist)
        }
    })

    return playlists
}
