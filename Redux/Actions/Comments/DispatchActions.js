export const AddComment = (stateComments, newComment) => {
    return {
        ...stateComments,
        byId: { ...stateComments.byId, [newComment.id]: newComment },
        allIds: [...stateComments.allIds, newComment.id],
    }
}

export const DeleteComment = (commentsState, commentId) => {
    const byId = Object.entries(commentsState.byId)
        .filter(([key]) => {
            return key !== commentId
        })
        .reduce(
            (obj, [key, value]) => {
                return { ...obj, [key]: value }
            },
            // Will reduce the byId {}
            {}
        )

    return {
        ...commentsState,
        byId,
        allIds: commentsState.allIds.filter(
            stateCommentId => stateCommentId !== commentId
        ),
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
