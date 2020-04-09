import { DELETE_MEMBER } from 'Gruvee/redux/actions/ActionsType'

// Action Creators
const deleteMember = memberId => {
    return {
        type: DELETE_MEMBER,
        data: memberId,
    }
}

// eslint-disable-next-line import/prefer-default-export
export const DeleteMember = (playlistId, memberId) => {
    return (dispatch, getState) => {
        const {
            PlaylistsDataReducer: { playlists },
        } = getState()

        // Check to see if we should delete the song from our state
        if (!isSharedMember(playlists, playlistId, memberId)) {
            dispatch(deleteMember(memberId))
        }
    }
}

// Helpers
const isSharedMember = (playlists, playlistId, memberId) => {
    // Check to see if memberId is part of another playlist
    // If it is do not run the deleteMember from state
    const val = Object.entries(playlists.byId).find(([key, playlistObj]) => {
        return key !== playlistId && playlistObj.members.includes(memberId)
    })
    return val
}
