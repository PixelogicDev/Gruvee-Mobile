import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { CreateUser, CreateSocialPlatform } from 'Gruvee/service/common/endpoints'
import User from 'Gruvee/lib/User'

// For Auth methods that are not custom, go ahead and create user document and then sign in
// eslint-disable-next-line import/prefer-default-export
export const CreateDocumentAndSignIn = async (platform, credential) => {
    // Call create platform function
    const createSocialPlatformResp = await CreateSocialPlatform(platform)
    if (createSocialPlatformResp.status !== 200) {
        console.log('Social Platform was not created')
        return
    }

    // Get user socialPlatform document reference
    const socialPlatformRef = await firestore()
        .collection('social_platforms')
        .doc(platform.id)

    console.log(socialPlatformRef)

    // Create User object
    const user = new User(`${platform.platformName}:${platform.id}`, platform.username, platform)
    // This is hacky as we should create another class that is specifically for sending from client
    user.preferredSocialPlatform = socialPlatformRef
    user.socialPlatforms = [socialPlatformRef]

    // Call service to create user
    const createUserResp = await CreateUser(user)
    if (createUserResp.status !== 200) {
        console.log('User was not created')
        return
    }

    // Sign in
    firebase.auth().signInWithCredential(credential)
}
