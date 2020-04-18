import firestore from '@react-native-firebase/firestore'
import { FetchChildRefs } from './helpers'

export const GetSongsDocuments = async playlistId => {
    const db = firestore()
    const dbPlaylistSnap = await db
        .collection('playlists')
        .doc(playlistId)
        .get()

    const dbPlaylist = dbPlaylistSnap.data()
    const songs = await FetchChildRefs(dbPlaylist.songs.allSongs)

    return songs
}

export const CreateNewSongDocument = async song => {
    try {
        // Write to DB
        const db = firestore()
        const songDoc = db.collection('songs').doc(song.id)

        // If our document creation is a success, we can set data in document
        await songDoc.set(song)
        return songDoc
    } catch (error) {
        console.warn(error)
    }

    return null
}

export const UpdatePlaylistDocumentWithSong = async (playlistId, songDocRef, user) => {
    const db = firestore()
    const playlistDocRef = await db.collection('playlists').doc(playlistId)

    db.runTransaction(transaction => {
        return transaction.get(playlistDocRef).then(playlistDoc => {
            if (!playlistDoc.exists) {
                throw new Error('userDoc did not exist.')
            }

            const currentSongs = playlistDoc.data().songs

            // Add user that added song to addedBy
            const currentSongsAddedBy = { ...currentSongs.addedBy }
            currentSongsAddedBy[user.id] = currentSongsAddedBy[user.id]
                ? [...currentSongsAddedBy[user.id], songDocRef.id]
                : [songDocRef.id]

            // Add songDocRef to allSongs array
            const currentAllSongs = [...currentSongs.allSongs, songDocRef]

            transaction.update(playlistDocRef, {
                songs: { addedBy: currentSongsAddedBy, allSongs: currentAllSongs },
            })
        })
    })
}
