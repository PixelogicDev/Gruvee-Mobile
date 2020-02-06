// This should take our state and return an array of songs to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapSongsFromPlaylist = (state, playlistId) => {
    const songs = []

    if (state.SongsDataReducer.songs.byId === undefined) return songs
    if (state.PlaylistsDataReducer.playlists.byId === undefined) return songs

    // Get list of songIds from playlist
    const songIds = state.PlaylistsDataReducer.playlists.byId[playlistId].songs

    songIds.forEach(songId => {
        const song = state.SongsDataReducer.songs.byId[songId]
        if (song !== undefined) {
            songs.push(song)
        }
    })

    return songs
}
