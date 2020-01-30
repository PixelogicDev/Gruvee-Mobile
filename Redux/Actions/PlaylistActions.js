// ywnklme - "I gotta change the amount of points for this stuff. It is too much” – Alec, January 2020" (01/28/20)
// JMSWRNR - "````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````" - (01/28/20)
// ywknlme - "TODO DODODODODO DODODODODODODODO DODODODODO... *plays Darude – Sandstorm*" (01/29/20)
export const AddPlaylistAction = (currentPlaylists, newPlaylist) => {
    return [...currentPlaylists, newPlaylist]
}

export const DeletePlaylistAction = (currentPlaylists, playlistIdToRemove) => {
    return currentPlaylists.filter(
        playlist => playlist.id !== playlistIdToRemove
    )
}

export const AddSongToPlaylistAction = (
    currentPlaylists,
    playlistId,
    newSong
) => {
    return currentPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
            return {
                ...playlist,
                songs: [...playlist.songs, newSong],
            }
        }

        return playlist
    })
}

export const FetchSongsFromPlaylist = (currentPlaylists, playlistId) => {
    return currentPlaylists.find(p => p.id === playlistId).songs
}

export const DeleteSongFromPlaylist = (
    currentPlaylists,
    playlistId,
    songId
) => {
    const newPlaylists = currentPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
            const filteredSongs = playlist.songs.filter(
                song => song.id !== songId
            )

            return {
                ...playlist,
                songs: filteredSongs,
            }
        }

        return playlist
    })

    return newPlaylists
}
