// QuantumBrat - "Remember this comment." (02/03/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import {
    ADD_PLAYLIST,
    ADD_PLAYLIST_SONG,
    ADD_SONG_COMMENT,
    DELETE_PLAYLIST,
    DELETE_PLAYLIST_SONG,
    DELETE_SONG_COMMENT,
    FETCH_PLAYLISTS,
    SET_CURRENT_PLAYLIST_ID,
} from 'Gruvee/Redux/Actions/ActionsType'

// Action Creators
const addPlaylist = playlist => {
    return {
        type: ADD_PLAYLIST,
        data: playlist,
    }
}

const addPlaylistSong = (songId, playlistId) => {
    return {
        type: ADD_PLAYLIST_SONG,
        data: { songId, playlistId },
    }
}

const addSongComment = (commentId, songId, playlistId) => {
    return {
        type: ADD_SONG_COMMENT,
        data: { commentId, songId, playlistId },
    }
}

const deletePlaylist = (playlistId, playlists) => {
    return {
        type: DELETE_PLAYLIST,
        data: { playlistId, playlists },
    }
}

const deletePlaylistSong = (songId, playlistId) => {
    return {
        type: DELETE_PLAYLIST_SONG,
        data: { songId, playlistId },
    }
}

const deleteSongComment = (commentId, songId, playlistId) => {
    return {
        type: DELETE_SONG_COMMENT,
        data: { commentId, songId, playlistId },
    }
}

const fetchPlaylists = playlists => {
    // Simulates call to get all playlists for current user
    // We are assuming we have a user signed in
    return { type: FETCH_PLAYLISTS, data: playlists }
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

export const AddPlaylistSong = (songId, playlistId, comment) => {
    return (dispatch, getState) => {
        // This is updating PlaylistsDataReducer
        dispatch(addPlaylistSong(songId, playlistId, comment))
    }
}

export const AddSongComment = (commentId, songId, playlistId) => {
    // We need to pass in playlistId && we need to map this in our playlost state
    return (dispatch, getState) => {
        dispatch(addSongComment(commentId, songId, playlistId))
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

export const DeletePlaylistSong = (songId, playlistId) => {
    return (dispatch, getState) => {
        dispatch(deletePlaylistSong(songId, playlistId))
    }
}

export const DeleteSongComment = (commentId, songId, playlistId) => {
    return (dispatch, getState) => {
        dispatch(deleteSongComment(commentId, songId, playlistId))
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
