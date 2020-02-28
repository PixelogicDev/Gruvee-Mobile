import {
    DELETE_COMMENT,
    FETCH_COMMENTS,
} from 'Gruvee/redux/actions/ActionsType'
import { DeleteSongComment } from 'Gruvee/redux/actions/playlists/SharedPlaylistActions'

// Action Creators
const deleteComment = commentId => {
    return {
        type: DELETE_COMMENT,
        data: commentId,
    }
}

const fetchComments = comments => {
    return {
        type: FETCH_COMMENTS,
        data: comments,
    }
}

// Thunks
export const DeleteComment = (commentId, songId, playlistId) => {
    // Make async call to update our db with removing comment
    // We also will need to update our respected song given the songId

    return dispatch => {
        // Remove comment from PlaylistsDataReducer
        dispatch(DeleteSongComment(commentId, songId, playlistId))

        // Remove comment from CommentsDataReducer
        dispatch(deleteComment(commentId))
    }
}

export const FetchComments = () => {
    // Make async call to service to get latest comments data for song
    return dispatch => {
        const comments = [] // Will be an array of comments objects
        dispatch(fetchComments(comments))
    }
}
