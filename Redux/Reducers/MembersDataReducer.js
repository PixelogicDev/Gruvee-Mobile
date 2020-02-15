import MockMembers from 'Gruvee/Mock/mockMembers'
import { FETCH_MEMBERS } from '../Actions/ActionsType'
import { FetchMembers } from '../Actions/Members/DispatchActions'

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
        case FETCH_MEMBERS:
            return {
                ...state,
                members: FetchMembers(state.members, action.data),
            }
        default:
            return state
    }
}
