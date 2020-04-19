import firestore from '@react-native-firebase/firestore'

// eslint-disable-next-line import/prefer-default-export
export const FetchChildRefs = async refs => {
    const db = firestore()
    const data = await Promise.all(
        refs.map(async ref => {
            const snapshot = await db.doc(ref.path).get()
            return snapshot.data()
        })
    )

    return data
}
