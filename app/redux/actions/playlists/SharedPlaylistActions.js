import {
    ADD_PLAYLIST_MEMBER,
    ADD_PLAYLIST_SONG,
    ADD_SONG_COMMENT,
    DELETE_PLAYLIST_SONG,
    DELETE_SONG_COMMENT,
} from 'Gruvee/redux/actions/ActionsType'

// Action Creators
const addPlaylistMember = (memberId, playlistId) => {
    return {
        type: ADD_PLAYLIST_MEMBER,
        data: { memberId, playlistId },
    }
}

const addPlaylistSong = (user, songId, playlistId) => {
    return {
        type: ADD_PLAYLIST_SONG,
        data: { user, songId, playlistId },
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
export const AddPlaylistMember = (memberId, playlistId) => {
    return dispatch => {
        dispatch(addPlaylistMember(memberId, playlistId))
    }
}

export const AddPlaylistSong = (user, songId, playlistId) => {
    return dispatch => {
        // This is updating PlaylistsDataReducer
        dispatch(addPlaylistSong(user, songId, playlistId))
    }
}

export const AddSongComment = (commentId, songId, playlistId) => {
    // We need to pass in playlistId && we need to map this in our playlost state
    return dispatch => {
        dispatch(addSongComment(commentId, songId, playlistId))
    }
}

export const DeletePlaylistSong = (songId, playlistId) => {
    return dispatch => {
        dispatch(deletePlaylistSong(songId, playlistId))
    }
}

export const DeleteSongComment = (commentId, songId, playlistId) => {
    return dispatch => {
        dispatch(deleteSongComment(commentId, songId, playlistId))
    }
}
