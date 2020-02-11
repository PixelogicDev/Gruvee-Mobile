// QuantumBrat - "Remember this comment." (02/03/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import {
    ADD_PLAYLIST,
    DELETE_PLAYLIST,
    FETCH_PLAYLISTS,
    SET_CURRENT_PLAYLIST_ID,
} from '../ActionsType'
import { DeleteSong } from '../Songs/SharedSongActions'

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

const fetchPlaylists = playlists => {
    // Simulates call to get all playlists for current user
    // We are assuming we have a user signed in
    return { type: FETCH_PLAYLISTS, data: playlists }
}

// Thunks
export const AddPlaylist = newPlaylist => {
    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { statePlaylists },
        } = getState()

        dispatch(addPlaylist(newPlaylist, statePlaylists))
    }
}

export const DeletePlaylist = playlistId => {
    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { playlists },
        } = getState()

        playlists.byId[playlistId].songs.forEach(songId => {
            // Delete songs from playlist from SongsDataReducer
            // Delete comments from song from CommentsDataReducer
            dispatch(DeleteSong(playlistId, songId))
        })

        // Delete playlist from PlaylistsDataReducer
        dispatch(deletePlaylist(playlistId))
    }
}

export const FetchPlaylists = () => {
    // Make async call to service to get latest playlist data for user
    return (dispatch, getState) => {
        const playlists = [] // Will be an array of playlist objects
        dispatch(fetchPlaylists(playlists))
    }
}

// Local State Settings
export const SetCurrentPlaylistId = playlistId => {
    return {
        type: SET_CURRENT_PLAYLIST_ID,
        data: playlistId,
    }
}
