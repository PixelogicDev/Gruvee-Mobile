import { ADD_MEMBER, DELETE_MEMBER, FETCH_MEMBERS } from 'Gruvee/redux/actions/ActionsType'
import { AddMember, DeleteMember, FetchMembers } from 'Gruvee/redux/actions/members/DispatchActions'

const initialState = { members: { byId: {}, allIds: [] } }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MEMBER:
            return {
                ...state,
                members: AddMember(state.members, action.data),
            }
        case DELETE_MEMBER:
            return {
                ...state,
                members: DeleteMember(state.members, action.data),
            }
        case FETCH_MEMBERS:
            return {
                ...state,
                members: FetchMembers(state.members, action.data),
            }
        default:
            return state
    }
}
