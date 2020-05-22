import { createSelector } from 'reselect'

// This should take our state and return an array of comments to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapCommentsFromSongSelector = createSelector(
    state => state.PlaylistsDataReducer.currentPlaylistId,
    (_, props) => props.route.params.songId, // We check for route as this is now coming from navigation
    state => state.PlaylistsDataReducer.playlists,
    state => state.CommentsDataReducer.comments,
    (currentPlaylistId, songId, playlists, comments) =>
        mapCommentsFromSong(currentPlaylistId, songId, playlists, comments)
)

// Helpers
const mapCommentsFromSong = (playlistId, songId, statePlaylists, stateComments) => {
    const comments = []

    if (!statePlaylists.byId[playlistId]) return comments
    if (!statePlaylists.byId[playlistId].comments[songId]) return comments

    // Get list of commentIds from playlist, from song
    statePlaylists.byId[playlistId].comments[songId].forEach(commentId => {
        const comment = stateComments.byId[commentId]
        if (comment) {
            comments.push(comment)
        }
    })

    return comments
}
