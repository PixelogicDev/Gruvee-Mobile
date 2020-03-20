// LiquoriceLion - "I’m going to need those TPS reports… ASAP… So, if you could do that, that'd be great..." – Bill Lumbergh" (03/20/20)
// TheDkbay - "Do these even matter anymore? Also remember Corona future Alec? or nah?" (03/20/20)
// JMSWRNR - "the government is making us quarantine so they can change the batteries in the pigeons" (03/20/20)
import firestore from '@react-native-firebase/firestore'

export const CreateNewPlaylistDocument = async playlist => {
    // Write to DB
    try {
        const playlistDoc = firestore()
            .collection('playlists')
            .doc(playlist.id)

        // If our document creation is a success, we can set data in document
        await playlistDoc.set(playlist)

        return Promise.resolve(playlistDoc)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const UpdateUserDocumentWithPlaylist = async (uid, playlistRef) => {
    try {
        const userDocRef = await firestore()
            .collection('users')
            .doc(uid)

        firestore().runTransaction(transaction => {
            return transaction.get(userDocRef).then(userDoc => {
                if (!userDoc.exists) {
                    return Promise.reject(new Error('userDoc did not exist.'))
                }

                const currentPlaylists = userDoc.data().playlists
                transaction.update(userDocRef, { playlists: [...currentPlaylists, playlistRef] })

                return Promise.resolve()
            })
        })
    } catch (error) {
        return Promise.reject(error)
    }
}
