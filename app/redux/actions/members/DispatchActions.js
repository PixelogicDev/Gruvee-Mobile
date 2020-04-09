export const AddMember = (membersState, member) => {
    const byId = { ...membersState.byId }
    byId[member.id] = member

    const allIds = [...membersState.allIds, member.id]

    return { byId, allIds }
}

export const DeleteMember = (membersState, memberId) => {
    const byId = Object.entries(membersState.byId)
        .filter(([key]) => {
            return key !== memberId
        })
        .reduce(
            (obj, [key, value]) => {
                return { ...obj, [key]: value }
            },
            // Will reduce the byId {}
            {}
        )

    return {
        ...membersState,
        byId,
        allIds: membersState.allIds.filter(stateMemberId => stateMemberId !== memberId),
    }
}

export const FetchMembers = (membersState, members) => {
    // Get user state playlists, map through IDs, and return
    if (members.length === 0) return membersState

    // If the user is already here, do not try and set again
    const newMembers = members.filter(member => !membersState.byId[member.id])

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    const reducedMembers = newMembers.reduce(
        (state, currentMember) => {
            // Members in multiple playlists should not be added multiple times to allIds
            const allIds =
                state.allIds.findIndex(id => currentMember.id === id) === -1
                    ? [...state.allIds, currentMember.id]
                    : [...state.allIds]
            return {
                byId: {
                    ...state.byId,
                    [currentMember.id]: currentMember,
                },
                allIds,
            }
        },
        { byId: {}, allIds: [] }
    )

    reducedMembers.byId = { ...reducedMembers.byId, ...membersState.byId }
    reducedMembers.allIds = [...reducedMembers.allIds, ...membersState.allIds]

    return reducedMembers
}
