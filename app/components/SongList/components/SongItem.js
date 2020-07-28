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
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => {
                    openSongDeepLinkAction(
                        songData,
                        currentUser.preferredSocialPlatform.platformName
                    )
                }}
            >
                <SongItemDetail
                    songData={songData}
                    platform={currentUser.preferredSocialPlatform.platformName}
                />
            </TouchableOpacity>
            <SongItemCommentBar songData={songData} />
        </View>
    )
}

// Helpers
const openSongDeepLinkAction = async (songData, platform) => {
    try {
        const songUrl = songData[platform].url
        const canOpenDeeplink = await Linking.canOpenURL(songUrl)

        if (!canOpenDeeplink) {
            Alert.alert("Song link isn't supported 😶")
            return
        }

        Linking.openURL(songUrl)
    } catch (error) {
        console.warn(error)
        Alert.alert('Unable to open song 👎')
    }
}

// Redux Mappers
const mapStatetoProps = state => ({
    currentUser: state.UserDataReducer.user,
})

export default connect(mapStatetoProps, null)(memo(SongItem))
