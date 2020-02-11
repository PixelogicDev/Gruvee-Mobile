import { ADD_COMMENT, BULK_COMMENTS_DELETE } from '../ActionsType'

import { AddSongComment } from '../Playlists/SharedPlaylistActions'

// Action Creators
const addComment = comment => {
    return {
        // evjand - "This app will never be finished" (02/07/20)
        type: ADD_COMMENT,
        data: comment,
    }
}

// Thunks
export const AddComment = (comment, songId, playlistId) => {
    // syszen - "it broke na na's, i had hope" (02/09/20)
    // Make async call to update our db with new comment
    // We also will need to update our respected song given the songI

    return (dispatch, getState) => {
        if (comment) {
            // Storing in PlaylistsDataReducer State
            dispatch(AddSongComment(comment.id, songId, playlistId))

            // Storing in CommentsDataReducer State
            dispatch(addComment(comment))
        }
    }
}

// Local State Settings
export const BulkCommentsDelete = commentIds => {
    return {
        type: BULK_COMMENTS_DELETE,
        data: commentIds,
    }
}
