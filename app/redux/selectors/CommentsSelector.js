import { createSelector } from 'reselect'

// This should take our state and return an array of comments to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapCommentsFromSongSelector = createSelector(
    state => state.PlaylistsDataReducer.currentPlaylistId,
    (_, props) => props.songId,
    state => state.PlaylistsDataReducer.playlists,
    state => state.CommentsDataReducer.comments,
    (currentPlaylistId, songId, playlists, comments) =>
        mapCommentsFromSong(currentPlaylistId, songId, playlists, comments)
)

// Helpers
const mapCommentsFromSong = (playlistId, songId, statePlaylists, stateComments) => {
    const comments = []

    // Get list of commentIds from playlist, from song
    const commentIds = statePlaylists.byId[playlistId].comments[songId]
    if (!commentIds) return comments

    commentIds.forEach(commentId => {
        const comment = stateComments.byId[commentId]
        if (comment !== undefined) {
            comments.push(comment)
        }
    })

    return comments
}
