import MockComments from 'Gruvee/mock/songComments'
import {
    ADD_COMMENT,
    BULK_COMMENTS_DELETE,
    DELETE_COMMENT,
    FETCH_COMMENTS,
} from 'Gruvee/redux/actions/ActionsType'
import {
    AddComment,
    BulkCommentsDelete,
    DeleteComment,
    FetchComments,
} from 'Gruvee/redux/actions/comments/DispatchActions'

const initialState = { comments: { byId: {}, allIds: [] } }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: AddComment(state.comments, action.data),
            }
        case BULK_COMMENTS_DELETE:
            return {
                ...state,
                comments: BulkCommentsDelete(state.comments, action.data),
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: DeleteComment(state.comments, action.data),
            }
        case FETCH_COMMENTS:
            return {
                ...state,
                comments: FetchComments(state.comments, action.data),
            }
        default:
            return state
    }
}
