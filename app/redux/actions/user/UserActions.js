// syszen - "first comment after inflation" (02/18/20)
import { GetUserDocument } from 'Gruvee/firestore/userActions'
import { SET_INITIAL_USER_DATA, SIGN_IN } from 'Gruvee/redux/actions/ActionsType'

// Action Creators
const setInitialUserData = user => {
    return {
        type: SET_INITIAL_USER_DATA,
        data: { user },
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
    console.log('SignInUser Redux Action: ', userId)

    return async dispatch => {
        // If we are reaching here, we are "signed in"
        // We then need to get data for user from Firestore
        try {
            const user = await GetUserDocument(userId)
            dispatch(signInUser(user))

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(Error('SignInUser Redux Action: ', error))
        }
    }
}

// chevywood_ - "chevywood_ was here! Keep it up dude!" (02/21/20)
// syszen - "and syszen was here too" (02/21/20)
export const SetInitialUserData = user => {
    return async dispatch => {
        // Continue with the dispatch and set user in state
        dispatch(setInitialUserData(user))
    }
}
