// sillyonly - "Swift is still better than this!" (02/03/20)
// InukApp "Swift > JS" (01/27/20)
import {
    ADD_PLAYLIST,
    ADD_PLAYLIST_MEMBER,
    ADD_PLAYLIST_SONG,
    ADD_SONG_COMMENT,
    DELETE_PLAYLIST,
    DELETE_PLAYLIST_SONG,
    DELETE_SONG_COMMENT,
    HYDRATE_PLAYLISTS,
    SET_CURRENT_PLAYLIST_ID,
} from 'Gruvee/redux/actions/ActionsType'
import {
    AddPlaylist,
    AddPlaylistMember,
    AddPlaylistSong,
    AddSongComment,
    DeletePlaylist,
    DeletePlaylistSong,
    DeleteSongComment,
    HydratePlaylists,
} from 'Gruvee/redux/actions/playlists/DispatchActions'
// InukApp - "Hello World" (01/27/20)
// LilCazza - "PixelogicDev's code is just like monkaS when I use this bug (*feature)" (01/28/20)
// ywnklme - "\_(ツ)_/¯" (01/27/20)

// Map mock data for initial state using HydratePlaylists
const initialState = { currentPlaylistId: '', playlists: { byId: {}, allIds: [] } }

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYLIST:
            return {
                ...state,
                playlists: AddPlaylist(action.data, state.playlists),
            }
        case ADD_PLAYLIST_MEMBER:
            return {
                ...state,
                playlists: AddPlaylistMember(action.memberId, action.playlistId, state.playlists),
            }
        case ADD_PLAYLIST_SONG:
            return {
                ...state,
                playlists: AddPlaylistSong(
                    action.data.songId,
                    action.data.playlistId,
                    state.playlists
                ),
            }
        case ADD_SONG_COMMENT:
            return {
                ...state,
                playlists: AddSongComment(
                    action.data.commentId,
                    action.data.songId,
                    action.data.playlistId,
                    state.playlists
                ),
            }
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: DeletePlaylist(action.data.playlistId, state.playlists),
            }
        case DELETE_PLAYLIST_SONG:
            return {
                ...state,
                playlists: DeletePlaylistSong(
                    action.data.songId,
                    action.data.playlistId,
                    state.playlists
                ),
            }
        case DELETE_SONG_COMMENT:
            return {
                ...state,
                playlists: DeleteSongComment(
                    action.data.commentId,
                    action.data.songId,
                    action.data.playlistId,
                    state.playlists
                ),
            }
        case HYDRATE_PLAYLISTS:
            return {
                ...state,
                playlists: HydratePlaylists(state.playlists, action.data),
            }
        case SET_CURRENT_PLAYLIST_ID:
            return {
                ...state,
                currentPlaylistId: action.data,
            }
        default:
            return state
    }
}
