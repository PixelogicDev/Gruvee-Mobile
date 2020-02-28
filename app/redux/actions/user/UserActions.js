import { SIGN_IN } from 'Gruvee/redux/actions/ActionsType'

// Action Creators
const signInUser = user => {
    return {
        type: SIGN_IN,
        data: user,
    }
}

// Thunks
// eslint-disable-next-line import/prefer-default-export
export const SignInUser = () => {
    // Here is where we should make out Firebase auth call
    // Then send over to the dispatch to map our state properly
    return (dispatch, getState) => {
        // This is here for now to get the currentUserObject until we use our service.
        const {
            UserDataReducer: { user },
        } = getState()
        dispatch(signInUser(user))
    }
}
