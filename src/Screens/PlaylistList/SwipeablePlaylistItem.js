import React, { useState } from 'react'
import { Alert } from 'react-native'

import images from 'res/images'
import AnimatedSwipeRow from 'lib/Common/AnimatedSwipeRow'
import SwipeAction from 'lib/Common/SwipeAction'
import PlaylistItem from 'Gruvee/src/screens/PlaylistItem/'
import * as StyleConstants from 'lib/Helpers/StyleConstants'

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

const renderSwipeActionComponent = (playlist, confirmDeletePlaylistAction) => {
    // eslint-disable-next-line global-require
    // const trashIconAsset = require('Gruvee/Assets/Icons/Trash/trash_icon.png')
    const trashIconAsset = images.icons.trash

    return (
        <SwipeAction
            name="Delete Action Button"
            action={confirmDeletePlaylistAction}
            icon={trashIconAsset}
            actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
            width={19}
            height={25}
        />
    )
}

export default SwipeablePlaylistItem
