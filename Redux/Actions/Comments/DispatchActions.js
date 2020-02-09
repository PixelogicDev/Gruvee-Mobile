export const AddComment = (commentsState, newComment) => {
    return {
        ...commentsState,
        byId: { ...commentsState.byId, [newComment.id]: newComment },
        allIds: [...commentsState.allIds, newComment.id],
    }
}

export const BulkCommentsDelete = (commentsState, commentIds) => {
    // Go through our state and remove comments from byId and allIds
    const newState = { ...commentsState }
    commentIds.forEach(id => {
        if (newState.byId[id]) {
            // Delete from byId
            delete newState.byId[id]
        }

        const index = newState.allIds.indexOf(id)
        if (index !== -1) {
            newState.allIds.splice(index, 1)
        }
    })

    return newState
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
