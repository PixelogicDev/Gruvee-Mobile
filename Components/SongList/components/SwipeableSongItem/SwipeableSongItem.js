import React, { useState } from 'react'
import { Alert } from 'react-native'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Playlist/SwipeAction'
import * as StyleConstants from '@StyleConstants'

import SongItem from '../SongItem/SongItem'

// deleteItemById === func
const SwipeableSongItem = ({ song, deleteItemById }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeleteSongAction = () =>
        comfirmDeleteAlert(song, onConfirmDelete)

    return (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={deleteItemById}
            itemHeight={120} // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                song,
                confirmDeleteSongAction
            )}
            listItemComponent={renderSongItem(song)}
        />
    )
}

// Actions
const comfirmDeleteAlert = (song, onConfirmDelete) => {
    Alert.alert(
        'Delete Song',
        `Come on, are you sure you want to delete ${song.name}?`,
        [
            {
                text: 'Delete',
                onPress: onConfirmDelete,
                style: 'destructive',
            },
            { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
    )
}

// Rendered Components
const renderSongItem = song => <SongItem songData={song} />

const renderSwipeActionComponent = (song, confirmDeleteSongAction) => (
    <SwipeAction
        name="Delete Action Button"
        action={() => {
            confirmDeleteSongAction(song)
        }}
        iconName="trash_icon"
        actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
        width={19}
        height={25}
    />
)

export default SwipeableSongItem
