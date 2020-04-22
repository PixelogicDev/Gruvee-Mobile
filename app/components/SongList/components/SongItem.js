import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Alert, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import SongItemCommentBar from './SongItemCommentBar'
import SongItemDetail from './SongItemDetail'

// Styles
const styles = StyleSheet.create({
    Container: {
        paddingBottom: 15,
        flex: 1,
    },
})

const SongItem = ({ songData, currentUser }) => {
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
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => {
                    openSongDeepLinkAction(
                        songData.externalUrls[currentUser.preferredSocialPlatform.platformName]
                    )
                }}
            >
                <SongItemDetail songData={songData} />
            </TouchableOpacity>
            <SongItemCommentBar songData={songData} />
        </View>
    )
}

// Redux Mappers
const mapStatetoProps = state => ({
    currentUser: state.UserDataReducer.user,
})

export default connect(mapStatetoProps, null)(memo(SongItem))
