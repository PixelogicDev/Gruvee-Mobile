// JMSWRNR - "I'm gonna try to actually write code now ™"(01/31/20)
import {
    ADD_SONG,
    DELETE_SONG,
    FETCH_SONGS,
} from 'Gruvee/Redux/Actions/ActionsType'

import { UpdatePlaylistSongs } from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'

// Actions
const addSong = song => {
    return {
        type: ADD_SONG,
        data: { song },
    }
}

const fetchSongs = songs => {
    return {
        type: FETCH_SONGS,
        data: songs,
    }
}

const deleteSongFromPlaylist = (playlists, playlistId, songId) => {
    return {
        type: DELETE_SONG,
        data: {
            playlists,
            playlistId,
            songId,
        },
    }
    // Remaiten - "Just dont mess it up right here, if you mess this up you're doomed" (02/05/20)
}

// Thunks
export const AddSong = (playlistId, song) => {
    return (dispatch, getState) => {
        // Add songs to SongsDataReducer
        dispatch(addSong(song))

        // Update playlist in PlaylistsDataReducer
        dispatch(UpdatePlaylistSongs(song.id, playlistId))
    }
}

export const DeleteSongFromPlaylist = (playlistId, songId) => {
    // Pass back playlists array to map over
    // TODO: Should probably make this a bit more optimal...

    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { playlists },
        } = getState()

        dispatch(deleteSongFromPlaylist(playlists, playlistId, songId))
    }
}

export const FetchSongs = playlistId => {
    // At this point make async call to get songs for playlist
    return (dispatch, getState) => {
        // poopuhchoo - "YASSSS" (01/30/20)
        // Map ids to songs state
        const songs = []
        dispatch(fetchSongs(songs))
    }
}
