import { createSelector } from 'reselect'

// This should take our state and return an array of songs to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapSongsFromPlaylistSelector = createSelector(
    state => state.PlaylistsDataReducer.playlists,
    state => state.SongsDataReducer.songs,
    state => state.PlaylistsDataReducer.currentPlaylistId,
    (playlists, songs, playlistId) => mapSongsFromPlaylist(playlists, songs, playlistId)
)

export const DidUserAddSongSelector = createSelector(
    state => state.UserDataReducer.user.id,
    state => state.PlaylistsDataReducer.currentPlaylistId,
    state => state.PlaylistsDataReducer.playlists,
    (_, props) => props.song.id,
    (userId, playlistId, playlists, songId) => didUserAddSong(userId, playlistId, playlists, songId)
)

// Helpers
const didUserAddSong = (userId, playlistId, playlists, songId) => {
    const userSongs = playlists.byId[playlistId].songs.addedBy[userId]
    if (userSongs) {
        return userSongs.includes(songId)
    }

    return false
}

const mapSongsFromPlaylist = (statePlaylists, stateSongs, playlistId) => {
    const songs = []

    if (!statePlaylists.byId[playlistId]) return songs
    if (!statePlaylists.byId[playlistId].songs) return songs

    statePlaylists.byId[playlistId].songs.allSongs.forEach(songId => {
        const song = stateSongs.byId[songId]
        if (song) {
            songs.push(song)
        }
    })

    // estrangedHD - "Heeyyy alec guess what I got Kappa" (02/07/20)
    return songs
}
