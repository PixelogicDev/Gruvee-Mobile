import React, { Fragment, useState, useEffect } from 'react'
import { BackHandler, View, StyleSheet, Platform } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import SongItem from './SongItem'
import AddButton from '../Playlist/Buttons/AddButton'
import * as StyleConstants from '../../StyleConstants'

const styles = StyleSheet.create({
    Container: {
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
    ContentContainer: {
        padding: StyleConstants.TABLE_CONTAINER_CONTENT_SPACING,
        paddingBottom: StyleConstants.TABLE_CONTAINER_BOTTOM_PADDING,
    },
    ButtonContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    Button: {
        width: StyleConstants.ADD_BUTTON_SIZE,
        height: StyleConstants.ADD_BUTTON_SIZE,
    },
})
const mockSongs = [
    {
        id: 'song0',
        addedBy: 'SomeOtherMember',
        name: 'SomeCoolNewSong',
        artist: 'YaBoiAlec',
        album: 'Album of The Year',
        albumArtwork: 'SomeBrokenString',
        platformDeepLink: 'spotify://SomeDeepLink',
        comments: [],
    },
    {
        id: 'song1',
        addedBy: 'SomeOtherMember',
        name: 'SomeCoolNewSong',
        artist: 'YaBoiAlec',
        album: 'Album of The Year',
        albumArtwork: 'SomeBrokenString',
        platformDeepLink: 'spotify://SomeDeepLink',
        comments: [],
    },
    {
        id: 'song2',
        addedBy: 'SomeOtherMember',
        name: 'SomeCoolNewSong',
        artist: 'YaBoiAlec',
        album: 'Album of The Year',
        albumArtwork: 'SomeBrokenString',
        platformDeepLink: 'spotify://SomeDeepLink',
        comments: [],
    },
]

const SongListView = () => {
    const keyExtractor = (item, index) => item.id
    const renderItem = ({ item }) => <SongItem songData={item} />

    const [songs, setSongs] = useState([])
    useEffect(() => {
        // Call API set to songs
        setSongs([...songs, ...mockSongs])
    }, [])

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={true}
                data={songs}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            ></SwipeListView>

            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddButton
                    style={styles.Button}
                    // createAction={createPlaylistAction}
                ></AddButton>
            </View>
        </>
    )
}

export default SongListView
