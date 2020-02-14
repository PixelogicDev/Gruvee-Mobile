// JMSWRNR - "I'm gonna try to actually write code now ™"(01/31/20)
// sillyonly - "SOOOOOOOOOOOOOOOOOOOOOOOOOO! some say, swift is simply better is this a good comment?? and can it fit in a line?!" (02/11/20)
// TheDkbay - "I really don't wanna do Elasticsearch anymore but I guess I'll have to figure it out also I like trains :)" (02/11/20)
import { ADD_SONG, FETCH_SONGS } from 'Gruvee/Redux/Actions/ActionsType'
import { AddPlaylistSong } from '../Playlists/SharedPlaylistActions'
import { AddComment } from '../Comments/SharedCommentActions'

// Action Creators
const addSong = song => {
    return {
        type: ADD_SONG,
        data: song,
    }
}

const fetchSongs = songs => {
    return {
        type: FETCH_SONGS,
        data: songs,
    }
}

// Thunks
export const AddSong = (playlistId, song, comment) => {
    return (dispatch, getState) => {
        // Add songs to SongsDataReducer
        dispatch(addSong(song))

        // Update playlist in PlaylistsDataReducer
        dispatch(AddPlaylistSong(song.id, playlistId))

        // Check for comment and if not null update PlaylistsDataReducer with comment
        dispatch(AddComment(comment, song.id, playlistId))
    }
}

// InukApp - "I bet if Swift had better Android support, Alec would've chosen to code in Swift." (02/09/20)
export const FetchSongs = playlistId => {
    // At this point make async call to get songs for playlist
    return (dispatch, getState) => {
        // poopuhchoo - "YASSSS" (01/30/20)
        // Map ids to songs state
        const songs = []
        dispatch(fetchSongs(songs))
    }
}
