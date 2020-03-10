// syszen - "first comment after inflation" (02/18/20)
import { GetUserDocument } from 'Gruvee/firestore/userActions'
import { SET_INITIAL_USER_DATA, SIGN_IN } from 'Gruvee/redux/actions/ActionsType'

// Action Creators
const setInitialUserData = (user, jwt) => {
    return {
        type: SET_INITIAL_USER_DATA,
        data: { user, jwt },
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
    return async (dispatch, getState) => {
        // If we are reaching here, we are "signed in"
        // We then need to get data for user from Firestore
        // Then should check JWT refresh stuff
        const user = await GetUserDocument(userId)
        console.log('SignInUser Redux Action: ', user)
        dispatch(signInUser(user))
    }
}

// chevywood_ - "chevywood_ was here! Keep it up dude!" (02/21/20)
// syszen - "and syszen was here too" (02/21/20)
export const SetInitialUserData = (user, jwt) => {
    return async (dispatch, getState) => {
        // Continue with the dispatch and set user in state
        dispatch(setInitialUserData(user, jwt))
    }
}
