// edburtnieks - "Turn off emote only chat" (02/22/20)
// sillyonly - "SOOOO YOU THOUGHT YOU CAN RUN?" (03/02/20)
// ywnklme - "!!! CHECK OUT SVELTE NATIVE TODAY !!!" (03/03/20)
import firestore from '@react-native-firebase/firestore'
import User from 'Gruvee/lib/User'
import { GetIsUsernameAvailable } from 'Gruvee/service/common/endpoints'
import { FetchChildRefs } from './helpers'

// sillyonly - "SOOOOO I HAVE ENOUGH TO DO THIS!" (02/21/20)
/**
 * Creates User document in Firestore
 * @param {object} newPlatformData SocialPlatform data that is associated with the user
 * @returns {object} Newly created user document
 * @returns {error} Error if fails
 */
export const CreateNewUserDocument = async newPlatformData => {
    try {
        // Create new User object here
        const newUser = new User(
            `${newPlatformData.platformName}:${newPlatformData.id}`,
            newPlatformData.username,
            newPlatformData
        )

        // Get user socialPlatform document reference
        const userSocialPlatformRef = await firestore()
            .collection('social_platforms')
            .doc(newUser.preferredSocialPlatform.id)

        // Add reference to our SocialPlatformDoc
        const newUserDoc = {
            ...newUser,
            preferredSocialPlatform: userSocialPlatformRef,
            socialPlatforms: [userSocialPlatformRef],
        }

        firestore()
            .collection('users')
            .doc(newUser.id)
            .set(newUserDoc)

        return newUser
    } catch (error) {
        return error
    }
}

// TheTechExec - "You are the semicolon to my statements" (03/03/20)
/**
 * Gets User Document from Firestore
 * @param {string} uid UserId of the Firestore document
 * @returns {Promise<object>} User data and playlist data
 */
export const GetUserDocument = async uid => {
    const db = firestore()
    const dbUserSnap = await db
        .collection('users')
        .doc(uid)
        .get()

    // no_neon_one: I should have used flutter. (07/10/20)
    const dbUser = dbUserSnap.data()

    // Remaiten - "and at this moment he knew he f'd up" (03/03/20)
    const socialPlatforms = await FetchChildRefs(dbUser.socialPlatforms)
    const isPreferredService = socialPlatforms.find(
        platform => platform.isPreferredService === true
    )

    // Get Playlist Data
    const playlistsData = await FetchChildRefs(dbUser.playlists)

    const reducedPlaylists = playlistsData.reduce((state, currentPlaylistData) => {
        return [
            ...state,
            {
                ...currentPlaylistData,
                createdBy: currentPlaylistData.createdBy.id,
                songs: {
                    addedBy: {
                        ...currentPlaylistData.songs.addedBy,
                    },
                    allSongs: currentPlaylistData.songs.allSongs.map(songRef => songRef.id),
                },
                members: currentPlaylistData.members.map(memberRef => memberRef.id),
            },
        ]
    }, [])

    const user = {
        ...dbUser,
        playlists: dbUser.playlists.map(playlistRef => playlistRef.id),
        preferredSocialPlatform: isPreferredService,
        socialPlatforms,
    }

    return { user, playlists: reducedPlaylists }
}

/**
 * Calls Firebase Function to check and see if desired username is already taken
 * @param {string} username Desired username
 * @returns {Promise<boolean>} True if username is available
 * @returns {Promise<boolean>} False if username is not available
 */
export const IsUsernameAvailable = async username => {
    try {
        const response = await GetIsUsernameAvailable(username)
        return response.data.result
    } catch (error) {
        console.warn('[IsUsernameAvailable]: ', error)
        return false
    }
}
