import MockComments from 'Gruvee/Mock/mockSongComments'
import {
    ADD_COMMENT,
    BULK_COMMENTS_DELETE,
    DELETE_COMMENT,
    FETCH_COMMENTS,
} from '../Actions/ActionsType'
import {
    AddComment,
    BulkCommentsDelete,
    DeleteComment,
    FetchComments,
} from '../Actions/Comments/DispatchActions'

// Mock Data Mapper
const mapMockComments = () => {
    const byId = {}
    const allIds = []

    MockComments.forEach(comment => {
        byId[comment.id] = comment
        allIds.push(comment.id)
    })

    return {
        comments: {
            byId,
            allIds,
        },
    }
}

// Map mock data for initial state using FetchComments
const initialState = mapMockComments()

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
