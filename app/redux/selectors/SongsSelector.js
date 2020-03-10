import { createSelector } from 'reselect'

// This should take our state and return an array of songs to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapSongsFromPlaylistSelector = createSelector(
    state => state.PlaylistsDataReducer.playlists,
    state => state.SongsDataReducer.songs,
    (_, props) => props.playlistId,
    (playlists, songs, playlistId) => mapSongsFromPlaylist(playlists, songs, playlistId)
)

// Helpers
const mapSongsFromPlaylist = (statePlaylists, stateSongs, playlistId) => {
    const songs = []

    if (stateSongs.byId === undefined) return songs
    if (statePlaylists.byId === undefined) return songs

    // Get list of songIds from playlist
    const songIds = statePlaylists.byId[playlistId].songs

    songIds.forEach(songId => {
        const song = stateSongs.byId[songId]
        if (song !== undefined) {
            songs.push(song)
        }
    })

    // estrangedHD - "Heeyyy alec guess what I got Kappa" (02/07/20)
    return songs
}
