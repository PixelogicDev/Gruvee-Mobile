// InukApp "Swift > JS" (01/27/20)
import MockPlaylists from 'Gruvee/Mock/mockPlaylists'
import {
    FETCH_MOCK_DATA,
    ADD_PLAYLIST,
    DELETE_PLAYLIST,
} from '../Actions/ActionsType'
import {
    AddPlaylistAction,
    DeletePlaylistAction,
} from '../Actions/Playlists/PlaylistActions'
import { FetchPlaylists } from '../Actions/Playlists/DispatchActions'
// InukApp - "Hello World" (01/27/20)
// LilCazza - "PixelogicDev's code is just like monkaS when I use this bug (*feature)" (01/28/20)
// ywnklme - "\_(ツ)_/¯" (01/27/20)
const initialState = { playlists: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOCK_DATA:
            return {
                // At this point I should already have my playlists or setup a thunk to get them based on user
                ...state,
                playlists: FetchPlaylists([
                    ...state.playlists,
                    ...MockPlaylists,
                ]),
            }
        case ADD_PLAYLIST:
            return {
                ...state,
                playlists: AddPlaylistAction(state.playlists, action.data),
            }
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: DeletePlaylistAction(state.playlists, action.data),
            }
        default:
            return state
    }
}
