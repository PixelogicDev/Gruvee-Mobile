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

const SongItem = ({ songData }) => {
    return (
        <>
            <View>
                <Text>{songData.name}</Text>
                <Text>{songData.artist}</Text>
                <Text>{songData.album}</Text>
            </View>
            <SongItemDetail></SongItemDetail>
            <SongItemCommentBar></SongItemCommentBar>
        </>
    )
}

export default SongItem
