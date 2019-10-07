import React, { useRef, useState } from 'react'
import {
    Alert,
    Animated,
    Dimensions,
    Text,
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import { SwipeRow } from 'react-native-swipe-list-view'
import SwipeAction from '../Playlist/SwipeAction'
import * as StyleConstants from '../../StyleConstants'

import SongItemDetail from './SongItemDetail'
import SongItemCommentBar from './SongItemCommentBar'

const styles = StyleSheet.create({
    Container: {
        paddingBottom: 25,
    },
})

const SongItem = ({ songData }) => {
    return (
        <View style={styles.Container}>
            <SongItemDetail songData={songData}></SongItemDetail>
            <SongItemCommentBar
                comments={songData.comments}
            ></SongItemCommentBar>
        </View>
    )
}

export default SongItem
