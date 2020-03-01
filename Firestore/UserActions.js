// edburtnieks - "Turn off emote only chat" (02/22/20)
import firestore from '@react-native-firebase/firestore'

// sillyonly - "SOOOOO I HAVE ENOUGH TO DO THIS!" (02/21/20)
// eslint-disable-next-line import/prefer-default-export
export const CreateNewUserDocument = async user => {
    try {
        // Get user socialPlatform document reference
        const userSocialPlatformRef = await firestore()
            .collection('social_platforms')
            .doc(user.preferredSocialPlatform.id)

        // Add reference to our SocialPlatformDoc
        const newUserDoc = {
            ...user,
            preferredSocialPlatform: userSocialPlatformRef,
            socialPlatforms: [userSocialPlatformRef],
        }

        return firestore()
            .collection('users')
            .doc(user.id)
            .set(newUserDoc)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const CreateSocialPlatformDocument = socialPlatform => {
    return firestore()
        .collection('social_platforms')
        .doc(socialPlatform.id)
        .set(socialPlatform)
}
