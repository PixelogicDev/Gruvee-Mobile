import { combineReducers } from 'redux'
import PlaylistsDataReducer from './PlaylistsDataReducer'
import SongsDataReducer from './SongsDataReducer'

export default combineReducers({
    PlaylistsDataReducer,
    SongsDataReducer,
})
