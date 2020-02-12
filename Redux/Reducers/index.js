import { combineReducers } from 'redux'
import CommentsDataReducer from './CommentsDataReducer'
import PlaylistsDataReducer from './PlaylistsDataReducer'
import SongsDataReducer from './SongsDataReducer'
import UserDataReducer from './UserDataReducer'

export default combineReducers({
    CommentsDataReducer,
    PlaylistsDataReducer,
    SongsDataReducer,
    UserDataReducer,
})
