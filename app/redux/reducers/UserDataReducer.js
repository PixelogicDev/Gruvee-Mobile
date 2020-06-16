import {
    ADD_PLAYLIST_TO_USER,
    DELETE_PLAYLIST_FROM_USER,
    SET_INITIAL_USER_DATA,
    SIGN_IN,
    SIGNING_IN_USER,
    UPDATE_USER_API_TOKEN,
} from 'Gruvee/redux/actions/ActionsType'
import {
    AddPlaylistToUser,
    DeletePlaylistFromUser,
    SetInitialUserData,
    SignInUser,
    UpdateUserAPIToken,
} from 'Gruvee/redux/actions/user/DispatchActions'

const initialState = { user: null, signingInUser: false }

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
            }
        case SIGN_IN:
            return {
                ...state,
                user: SignInUser(action.data),
            }
        case SIGNING_IN_USER:
            return {
                ...state,
                signingInUser: action.data,
            }
        case UPDATE_USER_API_TOKEN:
            return {
                ...state,
                user: UpdateUserAPIToken(state.user, action.data.tokenData, action.data.isRefresh),
            }
        default:
            return state
    }
}
