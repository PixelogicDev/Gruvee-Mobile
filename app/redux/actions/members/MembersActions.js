// QuantumBrat - "Remember this comment." (02/03/20)
// sillyonly - "One more comment to go!!" (02/13/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import { ADD_MEMBER, FETCH_MEMBERS } from 'Gruvee/redux/actions/ActionsType'
import { AddPlaylistMember } from 'Gruvee/redux/actions/playlists/SharedPlaylistActions'

// Action Creators
const addMember = member => {
    return {
        type: ADD_MEMBER,
        data: member,
    }
}

const fetchMembers = membersFromService => {
    return {
        type: FETCH_MEMBERS,
        data: membersFromService,
    }
}

// Thunks
export const AddMember = (member, playlistId) => {
    // This is currently not being used
    // Once we setup our service, this will most likely be changed
    return dispatch => {
        // Add member to playlist
        dispatch(AddPlaylistMember(member.id, playlistId))

        // Add member to MemberState
        dispatch(addMember(member, playlistId))
    }
}

export const FetchMembers = () => {
    // PlaylistId will be used to get list of members from service
    const membersFromService = []
    return dispatch => {
        dispatch(fetchMembers(membersFromService))
    }
}
