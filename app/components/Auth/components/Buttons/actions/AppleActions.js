import { UpdateSocialPlatform } from 'Gruvee/firestore/socialPlatformActions'
import { CreateSocialPlaylist } from 'Gruvee/service/common/endpoints'
import { DoesUserDocumentExist } from 'Gruvee/firestore/userActions'

// Calls Firestore query to check if the snapshot with the given uid exists
export const DoesAppleUserExistInFirebase = uid => {
    return DoesUserDocumentExist(uid)
}

// OnePocketPimp - "Alec discovered Apple APIs are a pain in the ass" (05/06/20)
export const HandleAppleDeepLink = async (userId, event, playlistTitle, updateUserAPIToken) => {
    // Get code
    const code = event.url.substring(event.url.indexOf('?') + 1, event.url.length)

    // Create firebase object
    const socialAPIToken = {
        apiToken: {
            createdAt: new Date().toISOString(),
            expiratedAt: '',
            expiresIn: -1,
            token: code,
        },
    }

    // Write to user document
    const updatedPlatform = await UpdateSocialPlatform(userId, socialAPIToken)
    const platformData = updatedPlatform.data()

    // Since we are just updating teh APIToken, we pass false in for refreshing the token
    const isRefresh = false
    // Call dispatch to set new token in State
    updateUserAPIToken(platformData, isRefresh)

    // Create social playlist
    await CreateSocialPlaylist(platformData, playlistTitle)
}
