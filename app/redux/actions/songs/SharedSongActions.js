// "TheDkbay: Narrator: "Unbeknownst to Alec the dependency issues will be back at a later point." (02/11/20)
import { DELETE_SONG } from 'Gruvee/redux/actions/ActionsType'

import { BulkCommentsDelete } from 'Gruvee/redux/actions/comments/SharedCommentActions'
import { DeletePlaylistSong } from 'Gruvee/redux/actions/playlists/SharedPlaylistActions'
import { RemoveSongFromPlaylist } from 'Gruvee/firestore/songActions'

// Action Creators
const deleteSong = songId => {
    return {
        type: DELETE_SONG,
        data: songId,
    }
}

// Thunks
// eslint-disable-next-line import/prefer-default-export
export const DeleteSong = (playlistId, songId, isDeletingPlaylist) => {
    return async (dispatch, getState) => {
        const {
            UserDataReducer: { user },
            PlaylistsDataReducer: { playlists },
        } = getState()

        if (!isDeletingPlaylist) {
            RemoveSongFromPlaylist(playlistId, user.id, songId)
        }

        // If we are deleting our song, we should dispatch a comment delete as well (in CommentsDataReducer)
        const comments = playlists.byId[playlistId].comments[songId]
        dispatch(BulkCommentsDelete(comments, playlistId, songId))

        // Here we will need to also remove all the comments associated with it (in playlist)
        dispatch(DeletePlaylistSong(songId, playlistId, user.id))

        // Check to see if we should delete the song from our state
        if (!isSharedSong(playlists, playlistId, songId)) {
            dispatch(deleteSong(songId))
        }
    }
}

// Helpers
const isSharedSong = (playlists, playlistId, songId) => {
    // Check to see if songId is part of another playlist
    // If it is do not run the deleteSong from state
    const val = Object.entries(playlists.byId).find(([key, playlistObj]) => {
        return key !== playlistId && playlistObj.songs.allSongs.includes(songId)
    })

    return val
}
