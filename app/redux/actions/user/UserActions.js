// syszen - "first comment after inflation" (02/18/20)
import { GetCustomFirebaseToken } from 'Gruvee/Service/Spotify/Endpoints'
import { SET_INITIAL_USER_DATA, SIGN_IN } from '../ActionsType'

// Action Creators
const setInitialUserData = user => {
    return {
        type: SET_INITIAL_USER_DATA,
        data: user,
    }
}

const signInUser = user => {
    return {
        type: SIGN_IN,
        data: user,
    }
}

// Thunks
export const SignInUser = userId => {
    // At this point we will need the userId to generate a customToken for FB Auth
    // Firebase token generation is only allowed in server settings
    // So we will wire a firebase function for this
    // Once user is signed in we should fetch data from DB

    return (dispatch, getState) => {
        // This is here for now to get the currentUserObject until we use our service.
        const {
            UserDataReducer: { user },
        } = getState()
        dispatch(signInUser(user))
    }
}

// chevywood_ - "chevywood_ was here! Keep it up dude!" (02/21/20)
// syszen - "and syszen was here too" (02/21/20)
export const SetInitialUserData = user => {
    return async (dispatch, getState) => {
        // Get JWT
        const result = await GetCustomFirebaseToken(user.id)

        console.log(result)

        // Continue with the dispatch and set user in state
        dispatch(setInitialUserData(user))
    }
}
