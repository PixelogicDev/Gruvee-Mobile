import React, { Fragment, useState, useEffect } from 'react'
import { Alert, BackHandler, View, StyleSheet, Platform } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import SongItem from './SongItem'
import AddButton from '../Playlist/Buttons/AddButton'
import AnimatedSwipeRow from '../Common/AnimatedSwipeRow'
// MOVE OUT SWIPE ACTION TO COMMON
import SwipeAction from '../Playlist/SwipeAction'
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

const SongListView = ({ playlistId, songs, deleteSongFromPlaylistAction }) => {
    const [songsToDisplay, setSongsToDisplay] = useState([])
    const keyExtractor = (item, index) => item.id
    const confirmDeleteSongAction = item => {
        Alert.alert(
            'Delete Song',
            `Come on, are you sure you want to delete ${item.name}?`,
            [
                {
                    text: 'Delete',
                    onPress: () => {
                        // TODO: Add some sort of promise
                        // If the first filter fails, lets not do the next one

                        // Filter out from current state
                        setSongsToDisplay(
                            songsToDisplay.filter(song => song.id !== item.id)
                        )

                        // Filter out song from parent state
                        deleteSongFromPlaylistAction(playlistId, item.id)
                    },
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        )
    }

    useEffect(() => {
        setSongsToDisplay(songs)
    }, [])

    const swipeActionComponent = item => (
        <SwipeAction
            name={'Delete Action Button'}
            action={() => {
                confirmDeleteSongAction(item)
            }}
            iconName={'trash_icon'}
            actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
            width={19}
            height={25}
        />
    )

    const songItemComponent = item => {
        return <SongItem songData={item} />
    }

    const renderItem = ({ item }) => (
        <AnimatedSwipeRow
            openValue={-75}
            isRightOpenValue={true}
            itemHeight={120}
            swipeActionComponent={swipeActionComponent(item)}
            listItemComponent={songItemComponent(item)}
        ></AnimatedSwipeRow>
    )

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={true}
                data={songsToDisplay}
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
