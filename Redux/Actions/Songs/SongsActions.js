// JMSWRNR - " I'm gonna try to actually write code now ™"(01/31/20)
import MockSongs from 'Gruvee/Mock/mockSongs'

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
        data: { playlists, playlistId, songId },
    }
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
    // Will be searching through array of songs for the ones we need for this playlist
    // Then set in Redux State
    return (dispatch, getState) => {
        // poopuhchoo - "YASSSS" (01/30/20)
        // firebase.com/getSongsForPlaylist(playlistId)
        // Go DB, get playlist, get songs data byId
        // Returns array of songs (Right now imported MockSongs for this)
        dispatch(fetchSongs(MockSongs))
    }
}

// Helpers
export const MapSongsFromPlaylist = (state, playlistId) => {
    const songs = []

    if (state.SongsDataReducer.songs.byId === undefined) return songs

    // Get list of songIds from playlist
    const songIds = state.PlaylistsDataReducer.playlists.byId[playlistId].songs

    songIds.forEach(songId => {
        const song = state.SongsDataReducer.songs.byId[songId]
        if (song !== undefined) {
            songs.push(song)
        }
    })

    return songs
}
