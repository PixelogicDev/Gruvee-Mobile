import React, { memo } from 'react'
import {
    Alert,
    Linking,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

import SongItemDetail from './components/SongItemDetail/SongItemDetail'
import SongItemCommentBar from './components/SongItemCommentBar/SongItemCommentBar'
import SongItemCommentSection from './components/SongItemCommentSection/SongItemCommentSection'

const SongItem = ({
    songData,
    toggleCommentsSectionAction,
    toggleCommentsSection,
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
        <TouchableOpacity
            style={styles.Container}
            onPress={() => {
                openSongDeepLinkAction(songData.platformDeepLink)
            }}
        >
            <SongItemDetail songData={songData} />
            {toggleCommentsSection && <SongItemCommentSection />}
            <SongItemCommentBar
                songData={songData}
                toggleCommentsSection={() => {
                    toggleCommentsSectionAction()
                }}
            />
        </TouchableOpacity>
    )
}

// Styles
const styles = StyleSheet.create({
    Container: {
        paddingBottom: 25,
    },
})

export default memo(SongItem)
