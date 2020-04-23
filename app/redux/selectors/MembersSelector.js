import { createSelector } from 'reselect'

// This should take our state and return an array of comments to display in our list
// eslint-disable-next-line import/prefer-default-export
export const MapMembersFromPlaylist = createSelector(
    state => state.PlaylistsDataReducer.currentPlaylistId,
    state => state.MembersDataReducer.members,
    state => state.PlaylistsDataReducer.playlists,
    (currentPlaylistId, members, playlists) =>
        mapMembersFromPlaylist(currentPlaylistId, members, playlists)
)

export const GetMemberForCommentSelector = createSelector(
    state => state.MembersDataReducer.members,
    (_, props) => props.comment.sender,
    (members, memberId) => members.byId[memberId]
)

// Helpers
const mapMembersFromPlaylist = (playlistId, stateMembers, statePlaylists) => {
    const members = []

    if (stateMembers.byId === undefined || statePlaylists.byId === undefined) {
        return members
    }

    // Get list of memberIds from playlist
    const playlist = statePlaylists.byId[playlistId]
    if (playlist === undefined) {
        return members
    }

    playlist.members.forEach(memberId => {
        const member = stateMembers.byId[memberId]
        if (member !== undefined) {
            members.push(member)
        }
    })

    return members
}
