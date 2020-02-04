// QuantumBrat - "Remember this comment." (02/03/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import {
    ADD_PLAYLIST,
    DELETE_PLAYLIST,
    FETCH_MOCK_DATA,
    UPDATE_PLAYLIST_SONGS,
} from 'Gruvee/Redux/Actions/ActionsType'

// Action Creators
const addPlaylist = playlist => {
    return {
        type: ADD_PLAYLIST,
        data: playlist,
    }
}

const deletePlaylist = (playlistId, playlists) => {
    return {
        type: DELETE_PLAYLIST,
        data: { playlistId, playlists },
    }
}

const fetchPlaylists = () => {
    // Simulates call to get all playlists for current user
    // We are assuming we have a user signed in
    return { type: FETCH_MOCK_DATA }
}

const updatePlaylistSongs = (songId, playlistId) => {
    return {
        type: UPDATE_PLAYLIST_SONGS,
        data: { songId, playlistId },
    }
}

// Thunks
export const AddPlaylistAction = newPlaylist => {
    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { statePlaylists },
        } = getState()

        dispatch(addPlaylist(newPlaylist, statePlaylists))
    }
}

export const DeletePlaylistAction = playlistId => {
    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { playlists },
        } = getState()

        dispatch(deletePlaylist(playlistId, playlists))
    }
}

export const FetchPlaylists = () => {
    return (dispatch, getState) => {
        dispatch(fetchPlaylists())
    }
}

export const UpdatePlaylistSongs = (songId, playlistId) => {
    return (dispatch, getState) => {
        dispatch(updatePlaylistSongs(songId, playlistId))
    }
}

// Helpers
export const MapPlaylistsFromUser = state => {
    const playlists = []
    const statePlaylists = state.PlaylistsDataReducer.playlists

    if (statePlaylists.allIds.length === 0) {
        return playlists
    }

    // Get all playlists for signed in user, but at this point we should already have the playlistIds
    statePlaylists.allIds.forEach(playlistId => {
        const playlist = statePlaylists.byId[playlistId]
        if (playlist !== undefined) {
            playlists.push(playlist)
        }
    })

    return playlists
}
