import { FETCH_MEMBERS, ADD_MEMBER } from 'Gruvee/redux/actions/ActionsType'
import { FetchMembers } from 'Gruvee/redux/actions/members/DispatchActions'
import { AddMember } from 'Gruvee/redux/actions/members/MembersActions'

const initialState = { members: { byId: {}, allIds: [] } }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MEMBER:
            return {
                ...state,
                members: AddMember(state.members, action.data),
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
