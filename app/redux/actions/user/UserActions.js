// syszen - "first comment after inflation" (02/18/20)
// W0lfDM - "WolfDM was Here" (03/20/20)
// TheDkbay - "If Alec ever finishes this project he can remove this comment LUL" (04/09/20)
// no_neon_one - "Where's my comments!!!!" (04/09/20)
import { GetUserDocument } from 'Gruvee/firestore/userActions'
import { SET_INITIAL_USER_DATA, SIGN_IN, SIGNING_IN_USER } from 'Gruvee/redux/actions/ActionsType'
import { HydratePlaylists } from 'Gruvee/redux/actions/playlists/PlaylistActions'
import { FetchMembers } from 'Gruvee/redux/actions/members/MembersActions'

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

const signingInUser = value => {
    return {
        type: SIGNING_IN_USER,
        data: value,
    }
}

// Thunks
export const SignInUser = userId => {
    return async dispatch => {
        // If we are reaching here, we are "signed in"
        // We then need to get data for user from Firestore
        const data = await GetUserDocument(userId)

        // After we are signed in, lets hydrate the playlists state
        dispatch(HydratePlaylists(data.playlists))

        // Pass in playlists to fetch members for each
        dispatch(FetchMembers(data.playlists))

        // Finally, sign in user with latest data
        dispatch(signInUser(data.user))

        return data.user
    }
}

// chevywood_ - "chevywood_ was here! Keep it up dude!" (02/21/20)
// syszen - "and syszen was here too" (02/21/20)
export const SetInitialUserData = user => {
    return async dispatch => {
        dispatch(setInitialUserData(user))
    }
}

export const SigningInUser = value => {
    return dispatch => {
        dispatch(signingInUser(value))
    }
}
