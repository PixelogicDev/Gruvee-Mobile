import firestore from '@react-native-firebase/firestore'
import { FetchChildRefs } from './helpers'

export const GetCommentsDocuments = async (songId, playlistId) => {
    const db = firestore()
    const dbPlaylistSnap = await db
        .collection('playlists')
        .doc(playlistId)
        .get()

    const dbPlaylist = dbPlaylistSnap.data()
    const commentRefs = dbPlaylist.comments[songId].map(commentId =>
        db.doc(`comments/${commentId}`)
    )

    const comments = await FetchChildRefs(commentRefs)
    const updatedComments = comments.map(comment => {
        return { ...comment, sender: comment.sender.id }
    })
    return updatedComments
}

export const CreateNewCommentDocument = async comment => {
    try {
        // Write to DB
        const db = firestore()
        const commentDoc = db.collection('comments').doc(comment.id)

        // Convert sender to be docRef of user
        const userDocRef = db.doc(`users/${comment.sender}`)
        const updatedComment = { ...comment, sender: userDocRef }

        // If our document creation is a success, we can set data in document
        await commentDoc.set(updatedComment)
        return commentDoc
    } catch (error) {
        console.warn(error)
    }

    return null
}

// export const RemoveSongFromPlaylist = async (playlistId, userId, songId) => {
//     const db = firestore()
//     const playlistDocRef = await db.doc(`playlists/${playlistId}`)

//     // Remove song docRef from playlist
//     db.runTransaction(transaction => {
//         return transaction.get(playlistDocRef).then(playlistDoc => {
//             if (!playlistDoc.exists) {
//                 throw new Error('userDoc did not exist.')
//             }

//             const currentSongs = playlistDoc.data().songs
//             const allSongs = currentSongs.allSongs.filter(songDocRef => songDocRef.id !== songId)
//             const userAddedBy = currentSongs.addedBy[userId]
//             const addedBy = {
//                 ...currentSongs.addedBy,
//                 [userId]: userAddedBy.filter(dbSongId => dbSongId !== songId),
//             }

//             transaction.update(playlistDocRef, {
//                 songs: { addedBy, allSongs },
//             })
//         })
//     })
// }

export const UpdatePlaylistDocumentWithComment = async (playlistId, commentDocRef, songId) => {
    const db = firestore()
    const playlistDocRef = await db.collection('playlists').doc(playlistId)

    db.runTransaction(transaction => {
        return transaction.get(playlistDocRef).then(playlistDoc => {
            if (!playlistDoc.exists) {
                throw new Error('userDoc did not exist.')
            }

            const currentComments = playlistDoc.data().comments
            const currentCommentsCopy = Object.keys(currentComments).length
                ? { ...currentComments, [songId]: [...currentComments[songId], commentDocRef.id] }
                : { [songId]: [commentDocRef.id] }

            transaction.update(playlistDocRef, {
                comments: { ...currentCommentsCopy },
            })
        })
    })
}
