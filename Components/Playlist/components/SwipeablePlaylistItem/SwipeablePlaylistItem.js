import React, { useState } from 'react'
import { Alert } from 'react-native'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Common/SwipeAction'
import PlaylistItem from '../PlaylistItem/PlaylistItem'
import * as StyleConstants from '@StyleConstants'

const SwipeablePlaylistItem = ({
    playlistData,
    deletePlaylistAction,
    deleteSongFromPlaylistAction,
}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeletePlaylistAction = () =>
        comfirmDeleteAlert(playlistData, onConfirmDelete)

    return (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={deletePlaylistAction}
            itemHeight={200} // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                playlistData,
                confirmDeletePlaylistAction
            )}
            listItemComponent={renderPlaylistItem(
                playlistData,
                deleteSongFromPlaylistAction
            )}
        />
    )
}

// Actions
const comfirmDeleteAlert = (playlistData, onConfirmDelete) => {
    Alert.alert(
        'Delete Playlist',
        `Come on, are you sure you want to delete ${playlistData.name}?`,
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
const renderPlaylistItem = (playlist, deleteSongFromPlaylistAction) => (
    <PlaylistItem
        playlistData={playlist}
        deleteSongFromPlaylistAction={deleteSongFromPlaylistAction}
    />
)

const renderSwipeActionComponent = (playlist, confirmDeletePlaylistAction) => (
    <SwipeAction
        name="Delete Action Button"
        action={confirmDeletePlaylistAction}
        iconName="trash_icon"
        actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
        width={19}
        height={25}
    />
)

export default SwipeablePlaylistItem
