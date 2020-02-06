import { FETCH_COMMENTS } from 'Gruvee/Redux/Actions/ActionsType'

// Action Creators
const fetchComments = comments => {
    return {
        type: FETCH_COMMENTS,
        data: comments,
    }
}

// eslint-disable-next-line import/prefer-default-export
export const FetchComments = songId => {
    // Make async call to service to get latest comments data for song
    return (dispatch, getState) => {
        const comments = [] // Will be an array of comments objects
        dispatch(fetchComments(comments))
    }
}

// const deletePlaylist = (playlistId, playlists) => {
//     return {
//         type: DELETE_PLAYLIST,
//         data: { playlistId, playlists },
//     }
// }

// Thunks
// export const AddPlaylistAction = newPlaylist => {
//     return (dispatch, getState) => {
//         const {
//             PlaylistsDataReducer: { statePlaylists },
//         } = getState()

//         dispatch(addPlaylist(newPlaylist, statePlaylists))
//     }
// }

// export const DeletePlaylistAction = playlistId => {
//     return (dispatch, getState) => {
//         const {
//             PlaylistsDataReducer: { playlists },
//         } = getState()

//         dispatch(deletePlaylist(playlistId, playlists))
//     }
// }
