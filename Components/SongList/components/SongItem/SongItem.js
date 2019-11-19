import React, { memo } from 'react'
import { Alert, Linking, StyleSheet, TouchableOpacity } from 'react-native'

import SongItemDetail from './components/SongItemDetail/SongItemDetail'
import SongItemCommentBar from './components/SongItemCommentBar/SongItemCommentBar'

const SongItem = ({
    songData,
    deleteCommentFromSongAction,
    updateSongsInPlaylistAction,
}) => {
    // Actions
    const openSongDeepLinkAction = platformDeepLink => {
        Linking.canOpenURL(platformDeepLink)
            .then(isSupported => {
                if (!isSupported) {
                    Alert.alert('Song is not supported 😶')
                    return
                }

                Linking.openURL(platformDeepLink).catch(() => {
                    Alert.alert('Unable to open song 👎')
                })
            })
            .catch(() => {
                Alert.alert('Invalid song 😐')
            })
    }

    return (
        <>
            <TouchableOpacity
                style={styles.Container}
                onPress={() => {
                    openSongDeepLinkAction(songData.platformDeepLink)
                }}
            >
                <SongItemDetail songData={songData} />
            </TouchableOpacity>
            <SongItemCommentBar
                songData={songData}
                deleteCommentFromSongAction={deleteCommentFromSongAction}
                updateSongsInPlaylistAction={updateSongsInPlaylistAction}
            />
        </>
    )
}

// Styles
const styles = StyleSheet.create({
    Container: {
        paddingBottom: 25,
        flex: 1,
    },
})

export default memo(SongItem)
