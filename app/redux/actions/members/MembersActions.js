// curiousdrive - "Musicians were helped while building this!!!" (04/07/20)
// QuantumBrat - "Remember this comment." (02/03/20)
// sillyonly - "One more comment to go!!" (02/13/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import { ADD_MEMBER, FETCH_MEMBERS } from 'Gruvee/redux/actions/ActionsType'
import { AddPlaylistMember } from 'Gruvee/redux/actions/playlists/SharedPlaylistActions'
import { GetMembersDocuments } from 'Gruvee/firestore/memberActions'

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

export const FetchMembers = playlists => {
    return async dispatch => {
        // Get members from each playlist and reduce
        const reducedMemberIds = playlists.reduce((state, currentPlaylist) => {
            return [...state, ...currentPlaylist.members]
        }, [])

        const membersData = await GetMembersDocuments(reducedMemberIds)

        dispatch(fetchMembers(membersData))
    }
}
