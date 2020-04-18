import firestore from '@react-native-firebase/firestore'
import { FetchChildRefs } from './helpers'

export const GetSongsDocuments = async playlistId => {
    const db = firestore()
    const dbPlaylistSnap = await db
        .collection('playlists')
        .doc(playlistId)
        .get()

    const dbPlaylist = dbPlaylistSnap.data()
    const songs = await FetchChildRefs(dbPlaylist.songs)

    return songs
}

export const CreateNewSongDocument = async song => {
    try {
        // Write to DB
        const db = firestore()
        const songDoc = db.collection('songs').doc(song.id)

        // Create reference to addedBy user
        const editedSong = { ...song }

        // Add reference for createdBy
        editedSong.addedBy = db.doc(`users/${song.addedBy.id}`)

        // If our document creation is a success, we can set data in document
        await songDoc.set(editedSong)

        return songDoc
    } catch (error) {
        console.warn(error)
    }

    return null
}

export const UpdatePlaylistDocumentWithSong = async (playlistId, songDocRef) => {
    const db = firestore()
    const playlistDocRef = await db.collection('playlists').doc(playlistId)

    db.runTransaction(transaction => {
        return transaction.get(playlistDocRef).then(playlistDoc => {
            if (!playlistDoc.exists) {
                throw new Error('userDoc did not exist.')
            }

            const currentSongs = playlistDoc.data().songs
            transaction.update(playlistDocRef, { songs: [...currentSongs, songDocRef] })
        })
    })
}
