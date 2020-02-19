import MockUser from 'Gruvee/Mock/mockUser'
import {
    ADD_PLAYLIST_TO_USER,
    DELETE_PLAYLIST_FROM_USER,
    SIGN_IN,
} from '../Actions/ActionsType'
import {
    AddPlaylistToUser,
    DeletePlaylistFromUser,
    SignInUser,
} from '../Actions/User/DispatchActions'

// Mock Data Mapper
const mapMockUser = () => {
    return {
        user: {
            ...MockUser,
        },
    }
}

const initialState = mapMockUser()

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYLIST_TO_USER:
            return {
                ...state,
                user: AddPlaylistToUser(action.data, state.user),
            }
        case DELETE_PLAYLIST_FROM_USER:
            return {
                ...state,
                user: DeletePlaylistFromUser(action.data, state.user),
            }
        case SIGN_IN:
            return {
                ...state,
                user: SignInUser(action.data),
            }
        default:
            return state
    }
}
