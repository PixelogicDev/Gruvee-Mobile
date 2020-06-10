// QuantumBrat - "Remember this comment." (02/03/20)
// sillyonly - "One more comment to go!!" (02/13/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import {
    ADD_PLAYLIST,
    DELETE_PLAYLIST,
    SET_CURRENT_PLAYLIST_ID,
} from 'Gruvee/redux/actions/ActionsType'
import { DeleteSong } from 'Gruvee/redux/actions/songs/SharedSongActions'
import {
    AddPlaylistToUser,
    DeletePlaylistFromUser,
    UpdateUserAPIToken,
} from 'Gruvee/redux/actions/user/SharedUserActions'
import { DeleteMember } from 'Gruvee/redux/actions/members/SharedMembersActions'
import {
    CreateNewPlaylistDocument,
    DeletePlaylistDocument,
    RemovePlaylistRefFromUserDocument,
    UpdateUserDocumentWithPlaylist,
} from 'Gruvee/firestore/playlistActions'
import { CreateSocialPlaylist } from 'Gruvee/service/common/endpoints'
import { FetchMembers } from 'Gruvee/redux/actions/members/MembersActions'

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

// Thunks
// evjand - "SMOrc ME CODE THUNK SMOrc" (02/13/20)
export const AddPlaylist = newPlaylist => {
    return async (dispatch, getState) => {
        try {
            const {
                PlaylistsDataReducer: { statePlaylists },
                UserDataReducer: { user },
            } = getState()

            // Write newly created playlist to firestore and then add to state
            const playlistDocRef = await CreateNewPlaylistDocument(newPlaylist)
            dispatch(addPlaylist(newPlaylist, statePlaylists))

            // Set db reference and write path to user doc in DB
            const userPlaylistDocUpdates = newPlaylist.members.map(memberId =>
                UpdateUserDocumentWithPlaylist(memberId, playlistDocRef)
            )

            // Dragonfleas - "I'm writing this message from inside the tornado, in my whole life I've never known what it was like to fly, in this moment, I'm glad I haven't." (04/22/20)
            await Promise.all(userPlaylistDocUpdates)

            // await UpdateUserDocumentWithPlaylist(user.id, playlistDocRef)
            dispatch(AddPlaylistToUser(newPlaylist.id))

            // Get members from playlists and put in state
            dispatch(FetchMembers([newPlaylist]))

            // Call endpoint to create playlist on social platform
            // If we needed a refreshed token, it will be passed back here
            const response = await CreateSocialPlaylist(
                user.preferredSocialPlatform,
                newPlaylist.name
            )
            if (response.status !== 204) {
                // Call redux action to update userDoc
                dispatch(UpdateUserAPIToken(response.data))
            } else {
                console.log('SocialPlatform was not updated.')
            }
        } catch (error) {
            console.warn(error)
        }
    }
}

export const DeletePlaylist = playlistId => {
    return async (dispatch, getState) => {
        const {
            UserDataReducer: { user },
            PlaylistsDataReducer: { playlists },
        } = getState()

        // If the creator of the playlist is deleting it, all members should not be able to access anymore
        // Check if currentSigned in user === createdBy user
        const playlist = playlists.byId[playlistId]
        if (playlist && playlist.createdBy === user.id) {
            console.log('Creator is deleting playlist...')

            // Get all members from playlist & delete reference to this playlist
            const promises = playlist.members.map(memberId =>
                RemovePlaylistRefFromUserDocument(memberId, playlistId)
            )

            Promise.all(promises)

            // Delete Playlist from Firebase
            await DeletePlaylistDocument(playlistId)
        }

        // Else if non-creator deletes the playlist just remove from that user document
        RemovePlaylistRefFromUserDocument(user.id, playlistId)

        playlists.byId[playlistId].songs.allSongs.forEach(songId => {
            // the true flag is isDeletingPlaylist
            dispatch(DeleteSong(playlistId, songId, true))
        })

        // Delete members from MembersDataReducer
        playlists.byId[playlistId].members.forEach(memberId => {
            dispatch(DeleteMember(playlistId, memberId))
        })

        // Delete playlist from PlaylistsDataReducer
        dispatch(deletePlaylist(playlistId))

        // Delete playlist from User
        dispatch(DeletePlaylistFromUser(playlistId))
    }
}

// Local State Settings
export const SetCurrentPlaylistId = playlistId => {
    return {
        type: SET_CURRENT_PLAYLIST_ID,
        data: playlistId,
    }
}
