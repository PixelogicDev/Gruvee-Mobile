// InukApp "Swift > JS" (01/27/20)
import mockPlaylists from 'Gruvee/Mock/mockPlaylists'
import { ADD_MOCK_DATA } from '../Actions/ActionsType'
// InukApp - "Hello World" (01/27/20)
const initialState = { playlists: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOCK_DATA:
            return {
                ...state,
                playlists: [...state.playlists, ...mockPlaylists],
            }
        default:
            return state
    }
}
