// QuantumBrat - "Remember this comment." (02/03/20)
// sillyonly - "One more comment to go!!" (02/13/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import {
    ADD_PLAYLIST,
    DELETE_PLAYLIST,
    HYDRATE_PLAYLISTS,
    SET_CURRENT_PLAYLIST_ID,
} from 'Gruvee/redux/actions/ActionsType'
import { DeleteSong } from 'Gruvee/redux/actions/songs/SharedSongActions'
import {
    AddPlaylistToUser,
    DeletePlaylistFromUser,
} from 'Gruvee/redux/actions/user/SharedUserActions'
import {
    CreateNewPlaylistDocument,
    DeletePlaylistDocument,
    UpdateUserDocumentWithPlaylist,
} from 'Gruvee/firestore/playlistActions'

// Action Creators
const addPlaylist = playlist => {
    return {
        type: ADD_PLAYLIST,
        data: playlist,
    }
}

const deletePlaylist = (playlistId, playlists) => {
    return {
        type: DELETE_PLAYLIST,
        data: { playlistId, playlists },
    }
}

const hydratePlaylists = playlists => {
    // Simulates call to get all playlists for current user
    // We are assuming we have a user signed in
    return { type: HYDRATE_PLAYLISTS, data: playlists }
}

// Thunks
// evjand - "SMOrc ME CODE THUNK SMOrc" (02/13/20)
export const AddPlaylist = newPlaylist => {
    return async (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { statePlaylists },
            UserDataReducer: { user },
        } = getState()

        // Write newly created playlist to firestore and then add to state
        const playlistDocRef = await CreateNewPlaylistDocument(
            newPlaylist,
            user.preferredSocialPlatform
        )

        dispatch(addPlaylist(newPlaylist, statePlaylists))

        // Set db reference and write path to user doc in DB
        await UpdateUserDocumentWithPlaylist(user.id, playlistDocRef)
        dispatch(AddPlaylistToUser(newPlaylist.id))
    }
}

export const DeletePlaylist = playlistId => {
    return async (dispatch, getState) => {
        const {
            UserDataReducer: { user },
            PlaylistsDataReducer: { playlists },
        } = getState()

        // Delete Playlist from Firebase
        await DeletePlaylistDocument(user.id, playlistId)

        playlists.byId[playlistId].songs.forEach(songId => {
            // Delete songs from playlist from SongsDataReducer
            // Delete comments from song from CommentsDataReducer
            dispatch(DeleteSong(playlistId, songId))
        })

        // Delete playlist from PlaylistsDataReducer
        dispatch(deletePlaylist(playlistId))

        // Delete playlist from User
        dispatch(DeletePlaylistFromUser(playlistId))
    }
}

export const HydratePlaylists = playlists => {
    // Make async call to service to get latest playlist data for user
    return dispatch => {
        dispatch(hydratePlaylists(playlists))
    }
}

// Local State Settings
export const SetCurrentPlaylistId = playlistId => {
    return {
        type: SET_CURRENT_PLAYLIST_ID,
        data: playlistId,
    }
}
