import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { CreateUser, CreateSocialPlatform } from 'Gruvee/service/common/endpoints'

// For Auth methods that are not custom, go ahead and create user document and then sign in
// eslint-disable-next-line import/prefer-default-export
export const CreateDocumentAndSignIn = async (platform, credential) => {
    // Sign in
    const signInCreds = await firebase.auth().signInWithCredential(credential)
    console.log(signInCreds)

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
    const id = signInCreds.user.uid
    const createUserRequest = {
        id,
        email: platform.email,
        socialPlatformPath: `social_platforms/${platform.id}`,
        profileImage: platform.profileImage,
        username: platform.username,
    }

    console.log(createUserRequest)

    // Call service to create user
    const createUserResp = await CreateUser(createUserRequest)
    if (createUserResp.status !== 200) {
        console.log('User was not created')
        return
    }

    console.log(createUserResp)
}
