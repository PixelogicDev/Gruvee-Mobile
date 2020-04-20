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
    if (statePlaylists.byId === undefined) return playlists
    if (userPlaylists === undefined || userPlaylists === null) return playlists

    const playlists = statePlaylists.allIds.map(playlistId => statePlaylists.byId[playlistId])
    return playlists
}
