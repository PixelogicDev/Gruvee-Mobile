// JMSWRNR - "I'm gonna try to actually write code now ™"(01/31/20)
// sillyonly - "SOOOOOOOOOOOOOOOOOOOOOOOOOO! some say, swift is simply better is this a good comment?? and can it fit in a line?!" (02/11/20)
// TheDkbay - "I really don't wanna do Elasticsearch anymore but I guess I'll have to figure it out also I like trains :)" (02/11/20)
import { ADD_SONG, FETCH_SONGS } from 'Gruvee/redux/actions/ActionsType'
import { AddPlaylistSong } from 'Gruvee/redux/actions/playlists/SharedPlaylistActions'
import { AddComment } from 'Gruvee/redux/actions/comments/SharedCommentActions'
import {
    GetSongsDocuments,
    CreateNewSongDocument,
    UpdatePlaylistDocumentWithSong,
} from 'Gruvee/firestore/songActions'

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
export const AddSong = (user, playlistId, song, comment) => {
    return async dispatch => {
        // Write song to songs collection
        const songDocRef = await CreateNewSongDocument(song)
        if (songDocRef === null) {
            throw new Error('SongDocRef was null and not created.')
        }

        // Write reference to playlist document
        await UpdatePlaylistDocumentWithSong(playlistId, songDocRef, user)

        // Add songs to state
        dispatch(addSong(song))

        // Update playlist in PlaylistsDataReducer
        dispatch(AddPlaylistSong(user, song.id, playlistId, comment))

        // Check for comment and if not null update PlaylistsDataReducer with comment
        dispatch(AddComment(comment, song.id, playlistId))
    }
}

// InukApp - "I bet if Swift had better Android support, Alec would've chosen to code in Swift." (02/09/20)
export const FetchSongs = playlistId => {
    // poopuhchoo - "YASSSS" (01/30/20)
    return async dispatch => {
        const songsData = await GetSongsDocuments(playlistId)
        dispatch(fetchSongs(songsData))
    }
}
