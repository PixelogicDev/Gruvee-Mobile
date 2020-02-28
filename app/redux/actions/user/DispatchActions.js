export const AddPlaylistToUser = (playlistId, user) => {
    return {
        ...user,
        playlists: [...user.playlists, playlistId],
    }
}

export const DeletePlaylistFromUser = (playlistId, user) => {
    return {
        ...user,
        playlists: user.playlists.filter(
            statePlaylistId => statePlaylistId !== playlistId
        ),
    }
}

export const SignInUser = user => {
    // We grab the data we need
    // Set in User state and be done with it
    return user
}
