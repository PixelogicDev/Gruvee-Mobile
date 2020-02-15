import { combineReducers } from 'redux'
import CommentsDataReducer from './CommentsDataReducer'
import MembersDataReducer from './MembersDataReducer'
import PlaylistsDataReducer from './PlaylistsDataReducer'
import SongsDataReducer from './SongsDataReducer'
import UserDataReducer from './UserDataReducer'

export default combineReducers({
    CommentsDataReducer,
    MembersDataReducer,
    PlaylistsDataReducer,
    SongsDataReducer,
    UserDataReducer,
})
