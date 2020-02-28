import { createSelector } from 'reselect'

// This should take our state and return an array of playlists to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapPlaylistsFromUserSelector = createSelector(
    state => state.PlaylistsDataReducer.playlists,
    state => state.UserDataReducer.user.playlists,
    (playlists, userPlaylists) => mapPlaylistsFromUser(playlists, userPlaylists)
)

// Helpers
const mapPlaylistsFromUser = (statePlaylists, userPlaylists) => {
    const playlists = []
    if (statePlaylists.byId === undefined) return playlists

    // Get all playlists for signed in user, but at this point we should already have the playlistIds
    userPlaylists.forEach(playlistId => {
        const playlist = statePlaylists.byId[playlistId]
        if (playlist !== undefined) {
            playlists.push(playlist)
        }
    })

    return playlists
}
