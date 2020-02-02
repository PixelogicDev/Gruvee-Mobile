import {
    ADD_SONG_TO_PLAYLIST,
    FETCH_SONGS,
    DELETE_SONG_FROM_PLAYLIST,
} from '../Actions/ActionsType'
import {
    AddSongToPlaylistAction,
    FetchSongs,
    FetchSongsFromPlaylist,
    DeleteSongFromPlaylist,
} from '../Actions/Songs/DispatchActions'

const initialState = { songs: {} }

// TODO: Should this reducer ALWAYS include a songs prop when returning
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SONGS:
            return {
                ...state,
                songs: FetchSongs(action.data),
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
                    action.data.playlists,
                    action.data.playlistId,
                    action.data.songId
                ),
            }
        default:
            return state
    }
}

/*
    PlaylistReducer
        Playlists -> [{..., [song, song song]}]
    
        SongsReducer
            Songs -> []
                FetchSongs = PlaylistReducer.Playlists.Songs
                DeleteSongs = PlaylistReducer.Playlists.Playlist > REMOVE SONG > 
                    {playlists: [WITH EDITED PL], songs: [...]}
        




*/
