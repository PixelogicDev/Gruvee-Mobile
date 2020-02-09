import {
    ADD_COMMENT,
    DELETE_COMMENT,
    FETCH_COMMENTS,
} from 'Gruvee/Redux/Actions/ActionsType'
import { AddSongComment } from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'
import { DeleteSongComment } from 'Gruvee/Redux/Actions/Songs/SongsActions'

// Action Creators
const addComment = comment => {
    return {
        // evjand - "This app will never be finished" (02/07/20)
        type: ADD_COMMENT,
        data: comment,
    }
}

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
export const AddComment = (comment, songId, playlistId) => {
    // syszen - "it broke na na's, i had hope" (02/09/20)
    // Make async call to update our db with new comment
    // We also will need to update our respected song given the songId
    return (dispatch, getState) => {
        // Update song with new comment
        dispatch(AddSongComment(comment.id, songId, playlistId))
        dispatch(addComment(comment))
    }
}

export const DeleteComment = (commentId, songId) => {
    // Make async call to update our db with removing comment
    // We also will need to update our respected song given the songId

    return (dispatch, getState) => {
        dispatch(DeleteSongComment(commentId, songId))
        dispatch(deleteComment(commentId))
    }
}

export const FetchComments = songId => {
    // Make async call to service to get latest comments data for song
    return (dispatch, getState) => {
        const comments = [] // Will be an array of comments objects
        dispatch(fetchComments(comments))
    }
}
