import { ADD_COMMENT, BULK_COMMENTS_DELETE } from 'Gruvee/redux/actions/ActionsType'

import { AddSongComment } from 'Gruvee/redux/actions/playlists/SharedPlaylistActions'
import {
    CreateNewCommentDocument,
    DeleteCommentDocument,
    UpdatePlaylistDocumentWithComment,
} from 'Gruvee/firestore/commentActions'

// Action Creators
const addComment = comment => {
    return {
        // evjand - "This app will never be finished" (02/07/20)
        type: ADD_COMMENT,
        data: comment,
    }
}

const bulkDeleteComments = commentIds => {
    return {
        type: BULK_COMMENTS_DELETE,
        data: commentIds,
    }
}

// Thunks
export const AddComment = (comment, songId, playlistId) => {
    // syszen - "it broke na na's, i had hope" (02/09/20)
    // Make async call to update our db with new comment
    // We also will need to update our respected song given the songId

    return async dispatch => {
        if (comment) {
            // Write to Firestore
            const commentDocRef = await CreateNewCommentDocument(comment)
            if (commentDocRef === null) {
                throw new Error('CommentDocRef was null and not created.')
            }

            // Write reference to playlist document
            await UpdatePlaylistDocumentWithComment(playlistId, commentDocRef, songId)

            // Storing in PlaylistsDataReducer State
            dispatch(AddSongComment(comment.id, songId, playlistId))

            // Storing in CommentsDataReducer State
            dispatch(addComment(comment))
        }
    }
}

export const BulkCommentsDelete = commentIds => {
    return dispatch => {
        // Delete comments from state
        dispatch(bulkDeleteComments(commentIds))

        const commentDocDeleteProimses = commentIds.map(commentId =>
            DeleteCommentDocument(commentId)
        )

        Promise.all(commentDocDeleteProimses)
    }
}
