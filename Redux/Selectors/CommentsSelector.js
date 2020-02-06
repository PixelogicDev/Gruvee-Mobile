// This should take our state and return an array of comments to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapCommentsFromSong = (state, songId) => {
    const comments = []

    if (state.CommentsDataReducer.comments.byId === undefined) return comments
    if (state.SongsDataReducer.songs.byId === undefined) return comments

    // Get list of commentIds from song
    const commentIds = state.SongsDataReducer.songs.byId[songId].comments

    commentIds.forEach(commentId => {
        const comment = state.CommentsDataReducer.comments.byId[commentId]
        if (comment !== undefined) {
            comments.push(comment)
        }
    })

    return comments
}
