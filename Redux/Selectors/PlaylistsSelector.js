// This should take our state and return an array of playlists to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapPlaylistsFromUser = state => {
    const playlists = []

    if (state.PlaylistsDataReducer.playlists.byId === undefined)
        return playlists

    const statePlaylists = state.PlaylistsDataReducer.playlists

    // Get all playlists for signed in user, but at this point we should already have the playlistIds
    statePlaylists.allIds.forEach(playlistId => {
        const playlist = statePlaylists.byId[playlistId]
        if (playlist !== undefined) {
            playlists.push(playlist)
        }
    })

    return playlists
}
