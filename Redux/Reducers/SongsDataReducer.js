import MockSongs from 'Gruvee/Mock/mockSongs'
import {
    ADD_SONG,
    DELETE_SONG,
    DELETE_SONG_COMMENT,
    FETCH_SONGS,
} from '../Actions/ActionsType'
import {
    AddSong,
    DeleteSong,
    DeleteSongComment,
    FetchSongs,
} from '../Actions/Songs/DispatchActions'

// Mock Data Mapper
const mapMockSongs = () => {
    const byId = {}
    const allIds = []

    MockSongs.forEach(song => {
        byId[song.id] = song
        allIds.push(song.id)
    })

    return {
        songs: {
            byId,
            allIds,
        },
    }
}

// estrangedHD - "Another one Kappa" (02/05/20)
const initialState = mapMockSongs()

// TODO: Should this reducer ALWAYS include a songs prop when returning
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SONG:
            return {
                ...state,
                songs: AddSong(action.data, state.songs),
            }
        case DELETE_SONG:
            return {
                ...state,
                songs: DeleteSong(action.data, state.songs),
            }
        case DELETE_SONG_COMMENT:
            return {
                ...state,
                songs: DeleteSongComment(
                    action.data.commentId,
                    action.data.songId,
                    state.songs
                ),
            }
        case FETCH_SONGS:
            return {
                ...state,
                songs: FetchSongs(action.data, state.songs),
            }
        default:
            return state
    }
}
