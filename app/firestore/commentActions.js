import firestore from '@react-native-firebase/firestore'
import { FetchChildRefs } from './helpers'

export const GetCommentsDocuments = async (songId, playlistId) => {
    const db = firestore()
    const dbPlaylistSnap = await db
        .collection('playlists')
        .doc(playlistId)
        .get()

    const dbPlaylist = dbPlaylistSnap.data()
    const commentRefs = dbPlaylist.comments[songId]
        ? dbPlaylist.comments[songId].map(commentId => db.doc(`comments/${commentId}`))
        : []

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

export const DeleteCommentDocument = async commentId => {
    const db = firestore()
    const commentDocRef = await db.doc(`comments/${commentId}`)

    // Remove playlist document
    await commentDocRef.delete()
}

export const DeleteCommentFromPlaylist = async (playlistId, songId, commentId) => {
    const db = firestore()
    const playlistDocRef = await db.doc(`playlists/${playlistId}`)

    // Remove comment ref docRef from playlist
    db.runTransaction(transaction => {
        return transaction.get(playlistDocRef).then(playlistDoc => {
            if (!playlistDoc.exists) {
                throw new Error('userDoc did not exist.')
            }

            const currentComments = playlistDoc.data().comments
            const songComments = currentComments[songId].filter(
                songCommentId => songCommentId !== commentId
            )

            transaction.update(playlistDocRef, {
                comments: { [songId]: [...songComments] },
            })
        })
    })
}

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
