import { firebase } from '@react-native-firebase/auth'
import { CreateUser, CreateSocialPlatform } from 'Gruvee/service/common/endpoints'

// For Auth methods that are not custom, go ahead and create user document and then sign in
// Pass in the username as we will be coming from that view
// eslint-disable-next-line import/prefer-default-export
export const CreateDocumentAndSignIn = async (username, credential, platform) => {
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
    await firebase.auth().signInWithCredential(credential)

    return createUserResp
}
