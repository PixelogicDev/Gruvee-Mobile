// LiquoriceLion - "I’m going to need those TPS reports… ASAP… So, if you could do that, that'd be great..." – Bill Lumbergh" (03/20/20)
// TheDkbay - "Do these even matter anymore? Also remember Corona future Alec? or nah?" (03/20/20)
// JMSWRNR - "the government is making us quarantine so they can change the batteries in the pigeons" (03/20/20)
import firestore from '@react-native-firebase/firestore'
import { CreateSocialPlaylist } from 'Gruvee/service/common/endpoints'

export const CreateNewPlaylistDocument = async (playlist, preferredSocialPlatform) => {
    // Write to DB
    const playlistDoc = firestore()
        .collection('playlists')
        .doc(playlist.id)

    // Create reference to members if any
    const editedPlaylist = playlist`
    if (editedPlaylist.members.length > 1) {
        editedPlaylist.members = editedPlaylist.members.map(memberId => `/users/${memberId}`)
    }

    // If our document creation is a success, we can set data in document
    await playlistDoc.set(editedPlaylist)

    // Call endpoint to create playlist on social platform
    CreateSocialPlaylist(preferredSocialPlatform, playlist)

    return playlistDoc
}

export const DeletePlaylistDocument = async (uid, playlistId) => {
    const userDocRef = await firestore().doc(`users/${uid}`)
    const playlistDocRef = await firestore().doc(`playlists/${playlistId}`)

    // Remove playlist document
    await playlistDocRef.delete()

    // Remove playlist docRef from user
    firestore().runTransaction(transaction => {
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
        })
    })
}
