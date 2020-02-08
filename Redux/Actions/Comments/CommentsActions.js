import { ADD_COMMENT, FETCH_COMMENTS } from 'Gruvee/Redux/Actions/ActionsType'
import { UpdateSongComments } from 'Gruvee/Redux/Actions/Songs/SongsActions'

// Action Creators
const addComment = comment => {
    return {
        // evjand - "This app will never be finished" (02/07/20)
        type: ADD_COMMENT,
        data: comment,
    }
}

const fetchComments = comments => {
    return {
        type: FETCH_COMMENTS,
        data: comments,
    }
}

// Thunks
export const AddComment = (comment, songId) => {
    // Make async call to update our db with new comment
    // We also will need to update our respected song given the songId
    return (dispatch, getState) => {
        // Update song with new comment
        dispatch(UpdateSongComments(comment.id, songId))

        dispatch(addComment(comment))
    }
}

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
