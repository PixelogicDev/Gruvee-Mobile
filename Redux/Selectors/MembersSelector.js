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

// Helpers
const mapMembersFromPlaylist = (playlistId, stateMembers, statePlaylists) => {
    const members = []
    if (
        playlistId === undefined ||
        stateMembers.byId === undefined ||
        statePlaylists.byId
    )
        return members

    // Get list of memberIds from playlist
    const memberIds = statePlaylists.byId[playlistId].members

    memberIds.forEach(memberId => {
        const member = stateMembers.byId[memberId]
        if (member !== undefined) {
            members.push(member)
        }
    })

    console.log('Members', members)
    return members
}
