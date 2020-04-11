// LiquoriceLion - "I’m going to need those TPS reports… ASAP… So, if you could do that, that'd be great..." – Bill Lumbergh" (03/20/20)
// TheDkbay - "Do these even matter anymore? Also remember Corona future Alec? or nah?" (03/20/20)
// JMSWRNR - "the government is making us quarantine so they can change the batteries in the pigeons" (03/20/20)
import firestore from '@react-native-firebase/firestore'

export const CreateNewPlaylistDocument = async playlist => {
    try {
        // Write to DB
        const db = firestore()
        const playlistDoc = db.collection('playlists').doc(playlist.id)

        // Create reference to members if any
        const editedPlaylist = { ...playlist }

        if (editedPlaylist.members.length) {
            editedPlaylist.members = editedPlaylist.members.map(memberId =>
                db.doc(`users/${memberId}`)
            )
        }

        // Add reference for createdBy
        editedPlaylist.createdBy = db.doc(`users/${editedPlaylist.createdBy}`)

        // If our document creation is a success, we can set data in document
        await playlistDoc.set(editedPlaylist)

        return playlistDoc
    } catch (error) {
        console.warn(error)
    }

    return null
}

export const DeletePlaylistDocument = async (uid, playlistId) => {
    const db = firestore()
    const userDocRef = await db.doc(`users/${uid}`)
    const playlistDocRef = await db.doc(`playlists/${playlistId}`)

    // Remove playlist document
    await playlistDocRef.delete()

    // Remove playlist docRef from user
    db.runTransaction(transaction => {
        return transaction.get(userDocRef).then(userDoc => {
            if (!userDoc.exists) {
                throw new Error('userDoc did not exist.')
            }

            const currentPlaylists = userDoc.data().playlists
            transaction.update(userDocRef, {
                playlists: currentPlaylists.filter(playlist => playlist.id !== playlistId),
            })
        })
    })

    // TODO: Delete associated songs

    // TODO: Delete associated comments
}

export const UpdateUserDocumentWithPlaylist = async (uid, playlistRef) => {
    const db = firestore()
    const userDocRef = await db.collection('users').doc(uid)

    db.runTransaction(transaction => {
        return transaction.get(userDocRef).then(userDoc => {
            if (!userDoc.exists) {
                throw new Error('userDoc did not exist.')
            }

            const currentPlaylists = userDoc.data().playlists
            transaction.update(userDocRef, { playlists: [...currentPlaylists, playlistRef] })
        })
    })
}
