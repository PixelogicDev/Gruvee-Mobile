import firestore from '@react-native-firebase/firestore'

// Takes in an array of member Ids and returns an array of member data
// eslint-disable-next-line import/prefer-default-export
export const GetMembersDocuments = async memberIds => {
    const db = firestore()
    const membersData = memberIds.map(async memberId => {
        // Grabbing user document
        // Can't do this unless currenUser.id === memberDoc.id
        const snapshot = await db
            .collection('users')
            .doc(memberId)
            .get()
        return snapshot.data()
    })

    const data = await Promise.all(membersData)
    return data
}
