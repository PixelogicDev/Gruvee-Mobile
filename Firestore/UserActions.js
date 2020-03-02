// edburtnieks - "Turn off emote only chat" (02/22/20)
// sillyonly - "SOOOO YOU THOUGHT YOU CAN RUN?" (03/02/20)
import firestore from '@react-native-firebase/firestore'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import User from 'Gruvee/lib/User'

// sillyonly - "SOOOOO I HAVE ENOUGH TO DO THIS!" (02/21/20)
// eslint-disable-next-line import/prefer-default-export
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

        return Promise.resolve(newUser)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const CreateSocialPlatformDocument = async (platformData, tokenObj) => {
    // Create socialPlatform Object
    const newSocialPlatform = new SocialPlatform(
        'spotify',
        platformData.id,
        platformData.display_name,
        platformData.images.length ? platformData.images[0] : null,
        platformData.email,
        tokenObj.access_token,
        tokenObj.refresh_token,
        true, // TODO: Figure approach to this
        platformData.product === 'premium'
    )

    // Write to DB
    try {
        await firestore()
            .collection('social_platforms')
            .doc(newSocialPlatform.id)
            .set(newSocialPlatform)

        return Promise.resolve(newSocialPlatform)
    } catch (error) {
        return Promise.reject(error)
    }
}
