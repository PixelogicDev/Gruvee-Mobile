// sillyonly - "I have tooooo many of these" (01/30/20)
// estrangedHD - "Can I also have one?" (01/30/20)
// estrangedHD - "And another one Kappa" (01/30/20)
// estrangedHD - "And another one Kappa" (01/30/20)
// dra031cko - "Spread everything, spread often." (02/04/20)
// ohmyshell - "kyle graduated code camp 2/12/2020" (02/12/20)

import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

// Redux
import { connect } from 'react-redux'
import { AddSong, FetchSongs } from 'Gruvee/redux/actions/songs/SongsActions'
import { DeleteSong } from 'Gruvee/redux/actions/songs/SharedSongActions'
import { MapSongsFromPlaylistSelector } from 'Gruvee/redux/selectors/SongsSelector'

import AddItemButton from 'Gruvee/components/common/AddItemButton'
import * as StyleConstants from 'Gruvee/config/styles'
import AddSongBottomSheet from 'Gruvee/components/SongList/components/AddSongBottomSheet'

import SwipeableSongItem from './components/SwipeableSongItem'

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

const SongListView = ({ playlistId, songs, deleteSong, fetchSongs }) => {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const bottomSheetRef = useRef(null)
    const keyExtractor = item => `${item.id}`

    // dra031cko - "WUBBA LUBBA DUB DUB" (02/01/20)
    const renderItem = ({ item }) => (
        <SwipeableSongItem song={item} deleteSongById={() => deleteSong(playlistId, item.id)} />
    )

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator
                data={songs}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshing={isRefreshing}
                onRefresh={() => {
                    setIsRefreshing(true)
                    fetchSongs(playlistId).finally(() => {
                        setIsRefreshing(false)
                    })
                }}
            />
            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddItemButton
                    style={styles.Button}
                    addItemAction={expandBottomSheet(bottomSheetRef)}
                />
            </View>
            <AddSongBottomSheet ref={bottomSheetRef} />
        </>
    )
}

// Actions
const expandBottomSheet = bottomSheetRef => () => {
    if (bottomSheetRef.current) {
        // TODO: To fix current issue with dismissing card, call this thing twice
        bottomSheetRef.current.snapTo(0)
        bottomSheetRef.current.snapTo(0)
    } else {
        console.warn('Could not dismiss bottom sheet')
    }
}

// Redux Mappers
const mapStateToProps = (state, props) => {
    // Should get songIds from playlist and map accordingly
    return { songs: MapSongsFromPlaylistSelector(state, props) }
}
const mapDispatchToProps = dispatch => ({
    addSong: (playlistId, song, comment) => dispatch(AddSong(playlistId, song, comment)),
    deleteSong: (playlistId, songId) =>
        // The false flag is for isDeletingPlaylist
        dispatch(DeleteSong(playlistId, songId, false)),
    fetchSongs: playlistId => dispatch(FetchSongs(playlistId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongListView)
