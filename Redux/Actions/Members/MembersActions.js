// QuantumBrat - "Remember this comment." (02/03/20)
// sillyonly - "One more comment to go!!" (02/13/20)
// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
import { FETCH_MEMBERS } from '../ActionsType'

// Action Creators
const fetchMembers = membersFromService => {
    return {
        type: FETCH_MEMBERS,
        data: membersFromService,
    }
}

// Thunks
// eslint-disable-next-line import/prefer-default-export
export const FetchMembers = playlistId => {
    // PlaylistId will be used to get list of members from service
    const membersFromService = []
    return (dispatch, getState) => {
        dispatch(fetchMembers(membersFromService))
    }
}
