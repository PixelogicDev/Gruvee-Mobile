import { createSelector } from 'reselect'

// eslint-disable-next-line import/prefer-default-export
export const UserSignInCompleteSelector = createSelector(
    state => state.UserDataReducer.user,
    user => user !== null
)
