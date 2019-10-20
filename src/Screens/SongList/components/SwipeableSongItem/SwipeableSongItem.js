import React, { useState } from 'react'
import { Alert } from 'react-native'

import * as StyleConstants from 'lib/Helpers/StyleConstants'
import images from 'res/images'

import AnimatedSwipeRow from 'Gruvee/src/Screens/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/src/Screens/Common/SwipeAction'
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

const renderSwipeActionComponent = (song, confirmDeleteSongAction) => {
    // eslint-disable-next-line global-require
    // const trashIconAsset = require('Gruvee/Assets/Icons/Trash/trash_icon.png')
    const trashIconAsset = images.icons.trash

    return (
        <SwipeAction
            name="Delete Action Button"
            action={() => {
                confirmDeleteSongAction(song)
            }}
            icon={trashIconAsset}
            actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
            width={19}
            height={25}
        />
    )
}

export default SwipeableSongItem
