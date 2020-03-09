import {
    ADD_PLAYLIST_TO_USER,
    DELETE_PLAYLIST_FROM_USER,
    SET_INITIAL_USER_DATA,
    SIGN_IN,
} from 'Gruvee/redux/actions/ActionsType'
import {
    AddPlaylistToUser,
    DeletePlaylistFromUser,
    SetInitialUserData,
    SignInUser,
} from 'Gruvee/redux/actions/user/DispatchActions'

const initialState = { user: {}, jwt: null }

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
        case SET_INITIAL_USER_DATA:
            return {
                ...state,
                user: SetInitialUserData(action.data.user, state.user),
                jwt: action.data.jwt,
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
