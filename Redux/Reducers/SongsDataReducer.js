import { ADD_SONG, DELETE_SONG, FETCH_SONGS } from '../Actions/ActionsType'
import {
    AddSong,
    DeleteSongFromPlaylist,
    FetchSongs,
} from '../Actions/Songs/DispatchActions'

const initialState = { songs: { byId: {}, allIds: [] } }

// TODO: Should this reducer ALWAYS include a songs prop when returning
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SONG:
            return {
                ...state,
                songs: AddSong(action.data.song, state.songs),
            }
        case DELETE_SONG:
            return {
                ...state,
                playlists: DeleteSongFromPlaylist(
                    action.data.playlists,
                    action.data.playlistId,
                    action.data.songId
                ),
            }
        case FETCH_SONGS:
            return {
                ...state,
                songs: FetchSongs(action.data),
            }
        default:
            return state
    }
}
