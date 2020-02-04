// sillyonly - "Swift is still better than this!" (02/03/20)
// InukApp "Swift > JS" (01/27/20)
import MockPlaylists from 'Gruvee/Mock/mockPlaylists'
import {
    FETCH_MOCK_DATA,
    ADD_PLAYLIST,
    DELETE_PLAYLIST,
    UPDATE_PLAYLIST_SONGS,
} from '../Actions/ActionsType'
import {
    AddPlaylist,
    DeletePlaylist,
    FetchPlaylists,
    UpdatePlaylistSongs,
} from '../Actions/Playlists/DispatchActions'
// InukApp - "Hello World" (01/27/20)
// LilCazza - "PixelogicDev's code is just like monkaS when I use this bug (*feature)" (01/28/20)
// ywnklme - "\_(ツ)_/¯" (01/27/20)
const initialState = { playlists: { byId: {}, allIds: [] } }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYLIST:
            return {
                ...state,
                playlists: AddPlaylist(action.data, state.playlists),
            }
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: DeletePlaylist(
                    action.data.playlistId,
                    action.data.playlists
                ),
            }
        case FETCH_MOCK_DATA:
            return {
                // At this point I should already have my playlists or setup a thunk to get them based on user
                ...state,
                // At this point if we have playlists in our state
                // Lets go ahead and map them in with our mock playlists
                playlists: FetchPlaylists(state.playlists, MockPlaylists),
            }
        case UPDATE_PLAYLIST_SONGS:
            return {
                ...state,
                playlists: UpdatePlaylistSongs(
                    action.data.songId,
                    action.data.playlistId,
                    state.playlists
                ),
            }
        default:
            return state
    }
}
