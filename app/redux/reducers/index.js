import { combineReducers } from 'redux'
import { SIGN_OUT } from 'Gruvee/redux/actions/ActionsType'
import CommentsDataReducer from './CommentsDataReducer'
import MembersDataReducer from './MembersDataReducer'
import PlaylistsDataReducer from './PlaylistsDataReducer'
import SongsDataReducer from './SongsDataReducer'
import UserDataReducer from './UserDataReducer'

const appReducer = combineReducers({
    CommentsDataReducer,
    MembersDataReducer,
    PlaylistsDataReducer,
    SongsDataReducer,
    UserDataReducer,
})

const rootReducer = (state, action) => {
    return appReducer(action.type === SIGN_OUT ? undefined : state, action)
}

export default rootReducer
