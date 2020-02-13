import {
    ADD_PLAYLIST_SONG,
    ADD_SONG_COMMENT,
    DELETE_PLAYLIST_SONG,
    DELETE_SONG_COMMENT,
} from 'Gruvee/Redux/Actions/ActionsType'

// Action Creators
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

// Thunks
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
