// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
export const AddPlaylistAction = (currentPlaylists, newPlaylist) => {
    return [...currentPlaylists, newPlaylist]
}
export const DeletePlaylistAction = (currentPlaylists, playlistIdToRemove) => {
    return currentPlaylists.filter(
        playlist => playlist.id !== playlistIdToRemove
    )
}
