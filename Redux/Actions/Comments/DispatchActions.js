export const AddComment = (stateComments, newComment) => {
    return {
        ...stateComments,
        byId: { ...stateComments.byId, [newComment.id]: newComment },
        allIds: [...stateComments.allIds, newComment.id],
    }
}

export const FetchComments = (commentsState, comments) => {
    if (commentsState.length === 0) return commentsState

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    const reducedComments = comments.reduce(
        (state, currentComments) => {
            return {
                byId: {
                    ...state.byId,
                    [currentComments.id]: currentComments,
                },
                allIds: [...state.allIds, currentComments.id],
            }
        },
        {
            byId: {},
            allIds: [],
        }
    )

    reducedComments.byId = {
        ...reducedComments.byId,
        ...commentsState.byId,
    }
    reducedComments.allIds = [
        ...reducedComments.allIds,
        ...commentsState.allIds,
    ]

    return reducedComments
}

// export const DeleteSong = (songId, stateSongs) => {
//     const byId = Object.entries(stateSongs.byId)
//         .filter(([key]) => {
//             return key !== songId
//         })
//         .reduce(
//             (obj, [key, value]) => {
//                 return { ...obj, [key]: value }
//             },
//             // Will reduce the byId {}
//             {}
//         )

//     return {
//         ...stateSongs,
//         byId,
//         allIds: stateSongs.allIds.filter(stateSongId => stateSongId !== songId),
//     }
// }
