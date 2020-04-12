export const AddPlaylistToUser = (playlistId, user) => {
    return {
        ...user,
        playlists: [...user.playlists, playlistId],
    }
}

export const DeletePlaylistFromUser = (playlistId, user) => {
    return {
        ...user,
        playlists: user.playlists.filter(statePlaylistId => statePlaylistId !== playlistId),
    }
}

export const SetInitialUserData = (user, stateUser) => {
    return {
        ...stateUser,
        ...user,
    }
}

export const SignInUser = user => {
    // We grab the data we need
    // Set in User state and be done with it
    return user
}

export const UpdateUserAPIToken = (stateUser, tokenData) => {
    const platformIndex = stateUser.socialPlatforms.findIndex(
        platform => platform.platformName === tokenData.platformName
    )

    if (platformIndex === -1) {
        console.warn('Could not find platform from obejct: ', tokenData)
        return {
            ...stateUser,
        }
    }

    const updatedUser = { ...stateUser }

    // We found the socialPlatform
    const updatedPlatform = {
        ...updatedUser.socialPlatforms[platformIndex],
        apiToken: { ...tokenData.refreshToken },
    }
    updatedUser.socialPlatforms.splice(platformIndex, 1, updatedPlatform)

    // We need to check for preferredPlatform
    if (updatedUser.preferredSocialPlatform.platformName === tokenData.platformName) {
        updatedUser.preferredSocialPlatform = { ...updatedPlatform }
    } else {
        console.log('PreferredSocialPlatform does not need to be updated')
    }

    return { ...updatedUser }
}
