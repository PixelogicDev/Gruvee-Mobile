import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

import AddButton from '../Playlist/Buttons/AddButton'
import SwipeableSongItem from './components/SwipeableSongItem/SwipeableSongItem'
import * as StyleConstants from '../../StyleConstants'

const SongListView = ({ playlistId, songs, deleteSongFromPlaylistAction }) => {
    const [songsToDisplay, setSongsToDisplay] = useState([])

    useEffect(() => {
        setSongsToDisplay(songs)
    }, [])

    const deleteItemById = id => {
        // TODO: Add some sort of promise
        // If the first filter fails, lets not do the next one

        // Filter out from current state
        setSongsToDisplay(songsToDisplay.filter(song => song.id !== id))

        // Filter out song from parent state
        deleteSongFromPlaylistAction(playlistId, id)
    }

    const renderItem = ({ item }) => (
        <SwipeableSongItem
            song={item}
            deleteItemById={() => deleteItemById(item.id)}
        />
    )

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator
                data={songsToDisplay}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddButton
                    style={styles.Button}
                    // createAction={createPlaylistAction}
                />
            </View>
        </>
    )
}

const keyExtractor = item => `${item.id}`

// Styles
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

export default SongListView
