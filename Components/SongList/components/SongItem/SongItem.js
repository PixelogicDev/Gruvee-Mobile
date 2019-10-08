import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'

import SongItemDetail from './components/SongItemDetail/SongItemDetail'
import SongItemCommentBar from './components/SongItemCommentBar/SongItemCommentBar'

const SongItem = ({ songData }) => {
    return (
        <View style={styles.Container}>
            <SongItemDetail songData={songData} />
            <SongItemCommentBar comments={songData.comments} />
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    Container: {
        paddingBottom: 25,
    },
})

export default memo(SongItem)
