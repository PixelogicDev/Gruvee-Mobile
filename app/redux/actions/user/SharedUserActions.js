import { ADD_PLAYLIST_TO_USER, DELETE_PLAYLIST_FROM_USER } from 'Gruvee/redux/actions/ActionsType'

// Action Creators
const addPlaylistToUser = playlistId => {
    return {
        type: ADD_PLAYLIST_TO_USER,
        data: playlistId,
    }
}

const deletePlaylistFromUser = playlistId => {
    return {
        type: DELETE_PLAYLIST_FROM_USER,
        data: playlistId,
    }
}

// Thunks
export const AddPlaylistToUser = playlistId => {
    return dispatch => {
        dispatch(addPlaylistToUser(playlistId))
    }
}

export const DeletePlaylistFromUser = playlistId => {
    return dispatch => {
        dispatch(deletePlaylistFromUser(playlistId))
    }
}
