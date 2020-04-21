import { createSelector } from 'reselect'

// This should take our state and return an array of songs to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapSongsFromPlaylistSelector = createSelector(
    state => state.PlaylistsDataReducer.playlists,
    state => state.SongsDataReducer.songs,
    state => state.PlaylistsDataReducer.currentPlaylistId,
    (playlists, songs, playlistId) => mapSongsFromPlaylist(playlists, songs, playlistId)
)

// Helpers
const mapSongsFromPlaylist = (statePlaylists, stateSongs, playlistId) => {
    const songs = []
    if (!stateSongs.allIds.length) return songs

    statePlaylists.byId[playlistId].songs.allSongs.forEach(songId => {
        const song = stateSongs.byId[songId]
        if (song) {
            songs.push(song)
        }
    })

    // estrangedHD - "Heeyyy alec guess what I got Kappa" (02/07/20)
    return songs
}
