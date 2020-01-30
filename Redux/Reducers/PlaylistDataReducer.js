// InukApp "Swift > JS" (01/27/20)
import mockPlaylists from 'Gruvee/Mock/mockPlaylists'
import {
    FETCH_MOCK_DATA,
    ADD_PLAYLIST,
    ADD_SONG_TO_PLAYLIST,
    DELETE_PLAYLIST,
    FETCH_SONGS,
    DELETE_SONG_FROM_PLAYLIST,
} from '../Actions/ActionsType'
import {
    AddPlaylistAction,
    AddSongToPlaylistAction,
    DeletePlaylistAction,
    FetchSongsFromPlaylist,
    DeleteSongFromPlaylist,
} from '../Actions/PlaylistActions'
// InukApp - "Hello World" (01/27/20)
// LilCazza - "PixelogicDev's code is just like monkaS when I use this bug (*feature)" (01/28/20)
// ywnklme - "\_(ツ)_/¯" (01/27/20)
const initialState = { playlists: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOCK_DATA:
            return {
                ...state,
                playlists: [...state.playlists, ...mockPlaylists],
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
        case FETCH_SONGS:
            return {
                ...state,
                songs: FetchSongsFromPlaylist(state.playlists, action.data),
            }
        case ADD_SONG_TO_PLAYLIST:
            return {
                ...state,
                playlists: AddSongToPlaylistAction(
                    state.playlists,
                    action.data.playlistId,
                    action.data.song
                ),
            }
        case DELETE_SONG_FROM_PLAYLIST:
            return {
                ...state,
                playlists: DeleteSongFromPlaylist(
                    state.playlists,
                    action.data.playlistId,
                    action.data.songId
                ),
            }
        default:
            return state
    }
}
