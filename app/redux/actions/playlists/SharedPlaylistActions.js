import {
    ADD_PLAYLIST_MEMBER,
    ADD_PLAYLIST_SONG,
    ADD_SONG_COMMENT,
    DELETE_PLAYLIST_SONG,
    DELETE_SONG_COMMENT,
    HYDRATE_PLAYLISTS,
} from 'Gruvee/redux/actions/ActionsType'

import { GetPlaylists } from 'Gruvee/firestore/playlistActions'

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

const deletePlaylistSong = (songId, playlistId, userId) => {
    return {
        type: DELETE_PLAYLIST_SONG,
        data: { songId, playlistId, userId },
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

export const DeletePlaylistSong = (songId, playlistId, userId) => {
    return dispatch => {
        dispatch(deletePlaylistSong(songId, playlistId, userId))
    }
}

export const DeleteSongComment = (commentId, songId, playlistId) => {
    return dispatch => {
        dispatch(deleteSongComment(commentId, songId, playlistId))
    }
}

const hydratePlaylists = playlists => {
    // Simulates call to get all playlists for current user
    // We are assuming we have a user signed in
    return { type: HYDRATE_PLAYLISTS, data: playlists }
}

export const FetchPlaylists = () => {
    return async (dispatch, getState) => {
        try {
            const {
                UserDataReducer: { user },
            } = getState()

            // Get playlists from Database
            const playlists = await GetPlaylists(user.id)

            dispatch(HydratePlaylists(playlists))
        } catch (error) {
            console.warn(error)
        }
    }
}

export const HydratePlaylists = playlists => {
    // Make async call to service to get latest playlist data for user
    return dispatch => {
        dispatch(hydratePlaylists(playlists))
    }
}
