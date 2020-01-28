// InukApp "Swift > JS" (01/27/20)
import mockPlaylists from 'Gruvee/Mock/mockPlaylists'
import { ADD_MOCK_DATA, ADD_PLAYLIST } from '../Actions/ActionsType'
// InukApp - "Hello World" (01/27/20)
const initialState = { playlists: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOCK_DATA:
            return {
                ...state,
                playlists: [...state.playlists, ...mockPlaylists],
            }
        case ADD_PLAYLIST:
            return {
                ...state,
                playlists: [...state.playlists, action.data],
            }
        default:
            return state
    }
}
