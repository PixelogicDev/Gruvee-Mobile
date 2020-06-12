import firestore from '@react-native-firebase/firestore'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'

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
        firestore()
            .collection('social_platforms')
            .doc(newSocialPlatform.id)
            .set(newSocialPlatform)

        return Promise.resolve(newSocialPlatform)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const UpdateSocialPlatform = async (uid, data) => {
    // Grab correct part of UID
    const splitId = uid.split(':')

    // Do a merge and overwrite/add any new data and keep the old data
    const db = firestore()
    const dbSocialPlatformSnap = await db.collection('social_platforms').doc(splitId[1])

    // Data should be in {key: value}
    await dbSocialPlatformSnap.update(data)
}
