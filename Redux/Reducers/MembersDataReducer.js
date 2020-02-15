import MockMembers from 'Gruvee/Mock/mockMembers'
import { FETCH_MEMBERS, ADD_MEMBER } from '../Actions/ActionsType'
import { FetchMembers } from '../Actions/Members/DispatchActions'
import { AddMember } from '../Actions/Members/MembersActions'

// Mock Data Mapper
const mapMockMembers = () => {
    const byId = {}
    const allIds = []

    MockMembers.forEach(member => {
        byId[member.id] = member
        allIds.push(member.id)
    })

    return {
        members: {
            byId,
            allIds,
        },
    }
}

const initialState = mapMockMembers()

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
