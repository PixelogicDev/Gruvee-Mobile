import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import AddItemButton from 'lib/Common/AddItemButton'
import SwipeableSongItem from 'Gruvee/src/screens/SongList/SwipeableSongItem'
import * as StyleConstants from 'lib/Helpers/StyleConstants'
import * as NavigationConstants from 'lib/Helpers/NavigationConstants'

const SongListScreen = ({
    playlistId,
    songs,
    deleteSongFromPlaylistAction,
}) => {
    const [songsToDisplay, setSongsToDisplay] = useState([])
    const [songLink, setSongLink] = useState([])
    const [songComment, setSongComment] = useState([])

    useEffect(() => {
        setSongsToDisplay(songs)
    }, [])
    // Actions
    const deleteItemById = id => {
        // TODO: Add some sort of promise
        // If the first filter fails, lets not do the next one

        // Filter out from current state
        setSongsToDisplay(songsToDisplay.filter(song => song.id !== id))

        // Filter out song from parent state
        deleteSongFromPlaylistAction(playlistId, id)
    }

    const generateInputModal = inputStyle => {
        return (
            <>
                <TextInput
                    placeholder="Song link"
                    placeholderTextColor={
                        StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                    }
                    style={inputStyle}
                    onChangeText={text => setSongLink(text)}
                    value={songLink}
                />
                <TextInput
                    placeholder="This song was p o p p i n...."
                    placeholderTextColor={
                        StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                    }
                    editable
                    style={inputStyle}
                    maxLength={280}
                    onChangeText={text => setSongComment(text)}
                    value={songComment}
                />
            </>
        )
    }

    const navigateToAddSongModalAction = () => {
        // Navigate to add playlist modal
        Navigation.showOverlay({
            component: {
                id: NavigationConstants.ADD_SONG_MODAL_NAV_ID,
                name: NavigationConstants.ADD_SONG_MODAL_NAV_NAME,
                options: {
                    overlay: {
                        interceptTouchOutside: false,
                    },
                },
                passProps: {
                    title: 'Add Song',
                    // createAction,
                },
            },
        })
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
                <AddItemButton
                    style={styles.Button}
                    modalNavigateAction={navigateToAddSongModalAction}
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

export default SongListScreen
