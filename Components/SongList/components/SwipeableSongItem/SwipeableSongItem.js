import React, { useState } from 'react'
import { Alert } from 'react-native'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Playlist/SwipeAction'
import * as StyleConstants from '@StyleConstants'

import SongItem from '../SongItem/SongItem'

const SwipeableSongItem = ({ item, deleteItemById }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeleteSongAction = () =>
        comfirmDeleteAlert(item, onConfirmDelete)

    return (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={() => deleteItemById(item.id)}
            itemHeight={120}
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                item,
                confirmDeleteSongAction
            )}
            listItemComponent={renderSongItem(item)}
        />
    )
}

const comfirmDeleteAlert = (item, onConfirmDelete) => {
    Alert.alert(
        'Delete Song',
        `Come on, are you sure you want to delete ${item.name}?`,
        [
            {
                text: 'Delete',
                onPress: () => onConfirmDelete(item.id),
                style: 'destructive',
            },
            { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
    )
}

const renderSongItem = item => <SongItem songData={item} />

const renderSwipeActionComponent = (item, confirmDeleteSongAction) => (
    <SwipeAction
        name="Delete Action Button"
        action={() => {
            confirmDeleteSongAction(item)
        }}
        iconName="trash_icon"
        actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
        width={19}
        height={25}
    />
)

export default SwipeableSongItem
