// JMSWRNR - "I'm gonna try to actually write code now ™"(01/31/20)
import {
    ADD_SONG,
    BULK_COMMENTS_DELETE,
    FETCH_SONGS,
} from 'Gruvee/Redux/Actions/ActionsType'
import { AddComment } from 'Gruvee/Redux/Actions/Comments/CommentsActions'
import {
    DeletePlaylistSong,
    AddPlaylistSong,
} from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'

// Action Creators
const addSong = song => {
    return {
        type: ADD_SONG,
        data: song,
    }
}

const bulkCommentsDelete = commentIds => {
    return {
        type: BULK_COMMENTS_DELETE,
        data: commentIds,
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
export const DeleteSong = (playlistId, songId) => {
    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { playlists },
            SongsDataReducer: { songs },
        } = getState()

        // Update playlist in PlaylistsDataReducer
        dispatch(DeletePlaylistSong(songId, playlistId))

        // Check to see if we should delete the song from our state
        if (!isSharedSong(playlists, playlistId, songId)) {
            dispatch(deleteSong(songId))
        }

        // If we are deleting our song, we should dispatch a comment delete as well
        dispatch(bulkCommentsDelete(songs.byId[songId].comments))
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

// Helpers
const isSharedSong = (playlists, playlistId, songId) => {
    // Check to see if songId is part of another playlist
    // If it is do not run the deleteSong from state

    const val = Object.entries(playlists.byId).find(([key, playlistObj]) => {
        return key !== playlistId && playlistObj.songs.includes(songId)
    })

    return val
}
