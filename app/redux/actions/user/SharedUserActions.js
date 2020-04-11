import {
    ADD_PLAYLIST_TO_USER,
    DELETE_PLAYLIST_FROM_USER,
    UPDATE_USER_API_TOKEN,
} from 'Gruvee/redux/actions/ActionsType'

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

const updatesUserAPIToken = tokenData => {
    return {
        type: UPDATE_USER_API_TOKEN,
        data: tokenData,
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

export const UpdateUserAPIToken = tokenData => {
    return dispatch => {
        dispatch(updatesUserAPIToken(tokenData))
    }
}
