import { SIGN_IN } from '../ActionsType'

// Action Creators
const signInUser = user => {
    return {
        type: SIGN_IN,
        data: user,
    }
}

// Thunks
// eslint-disable-next-line import/prefer-default-export
export const SignInUser = userId => {
    // Here we should call our Firebase function or write directly to our FireStore
    // We first need to check if the user already exists
    // We actually need to set our user Object from DB into state
    console.log('IN SIGNINUSER DISPATCH:', userId)
    return (dispatch, getState) => {
        // This is here for now to get the currentUserObject until we use our service.
        const {
            UserDataReducer: { user },
        } = getState()
        dispatch(signInUser(user))
    }
}
