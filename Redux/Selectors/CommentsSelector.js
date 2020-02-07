import { createSelector } from 'reselect'

// This should take our state and return an array of comments to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapCommentsFromSongSelector = createSelector(
    state => state.SongsDataReducer.songs,
    state => state.CommentsDataReducer.comments,
    (_, props) => props.songId,
    (songs, comments, songId) => mapCommentsFromSong(songs, comments, songId)
)

// Helpers
const mapCommentsFromSong = (stateSongs, stateComments, songId) => {
    const comments = []

    if (stateComments.byId === undefined) return comments
    if (stateSongs.byId === undefined) return comments

    // Get list of commentIds from song
    const commentIds = stateSongs.byId[songId].comments

    commentIds.forEach(commentId => {
        const comment = stateComments.byId[commentId]
        if (comment !== undefined) {
            comments.push(comment)
        }
    })

    return comments
}
