import { firebase } from '@react-native-firebase/auth'
import {
    CreateUser,
    CreateProviderUser,
    CreateSocialPlatform,
} from 'Gruvee/service/common/endpoints'

/**
 * For Auth that is is coming from a Firebase Auth Provider, create the user document and then sign in
 * @param {string} username Desired username
 * @param {string} credential Credential token from Apple required for sign in
 * @param {object} platform Social platform object created for user
 * @returns {object} UserCredential Firebase object
 */
export const CreateDocumentAndSignInRequest = async (username, credential, platform) => {
    // Call create platform function
    const createSocialPlatformResp = await CreateSocialPlatform(platform)
    if (createSocialPlatformResp.status !== 200) {
        throw new Error('Social Platform was not created')
    }

    // Create User object
    const createUserRequest = {
        id: `${platform.platformName}:${platform.id}`,
        email: platform.email,
        socialPlatformPath: `social_platforms/${platform.id}`,
        profileImage: platform.profileImage,
        displayName: username,
        username: username.toLowerCase(),
    }

    // Call service to create user
    const createUserResp = await CreateUser(createUserRequest)
    if (createUserResp.status !== 200) {
        throw new Error('User was not created')
    }
    // DR_DinoMight - "Damn it Android! What have you bust now!" (06/01/20)
    // Sign in
    const userCredential = await firebase.auth().signInWithCredential(credential)

    // Return current user to in case we need to add to provider_users collection
    return userCredential.user
}

/**
 * CreateProviderUserRequest setups and calls the Firebase function to create a new user in provider_users collection
 * @param {string} firebaseProviderUID UID that comes from Fireabse Authentication
 * @param {string} platformProviderUID UID that cames from the Service Authentication
 */
export const CreateProviderUserRequest = async (firebaseProviderUID, platformProviderUID) => {
    // Create request object
    const createProviderUserReq = {
        firebaseProviderUID,
        platformProviderUID,
    }

    // Call the thing
    await CreateProviderUser(createProviderUserReq)
}
