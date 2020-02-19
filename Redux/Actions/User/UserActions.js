// syszen - "first comment after inflation" (02/18/20)
// import { GetCurrentUser } from 'Gruvee/Service/Spotify/Endpoints'
import { SET_USER_API_TOKEN, SIGN_IN } from '../ActionsType'

// Action Creators
const setUserApiToken = token => {
    return {
        type: SET_USER_API_TOKEN,
        data: token,
    }
}

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

    return (dispatch, getState) => {
        // This is here for now to get the currentUserObject until we use our service.
        const {
            UserDataReducer: { user },
        } = getState()
        dispatch(signInUser(user))
    }
}

export const SetUserApiToken = token => {
    return (dispatch, getState) => {
        dispatch(setUserApiToken(token))
    }
}
