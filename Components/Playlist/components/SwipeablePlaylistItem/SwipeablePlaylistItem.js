import React, { useState } from 'react'
import { Alert } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { DELETE_PLAYLIST } from 'Gruvee/Redux/Actions/ActionsType'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Common/SwipeAction'
import PlaylistItem from '../PlaylistItem/PlaylistItem'
import * as StyleConstants from '@StyleConstants'

const SwipeablePlaylistItem = ({
    playlistData,
    deletePlaylist,
    updateSongsInPlaylistAction,
}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeletePlaylistAction = () =>
        comfirmDeleteAlert(playlistData, onConfirmDelete)

    return (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={() => {
                deletePlaylist(playlistData.id)
            }}
            itemHeight={200} // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                playlistData,
                confirmDeletePlaylistAction
            )}
            listItemComponent={renderPlaylistItem(
                playlistData,
                updateSongsInPlaylistAction
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
const renderPlaylistItem = (playlist, updateSongsInPlaylistAction) => (
    <PlaylistItem
        playlistData={playlist}
        updateSongsInPlaylistAction={updateSongsInPlaylistAction}
    />
)

const renderSwipeActionComponent = (playlist, confirmDeletePlaylistAction) => {
    // eslint-disable-next-line global-require
    const trashIconAsset = require('Gruvee/Assets/Icons/Trash/trash_icon.png')

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

// Redux Action Creators
const deletePlaylist = playlistId => {
    return {
        type: DELETE_PLAYLIST,
        data: playlistId,
    }
}

// Redux Mappers
const mapDispatchToProps = dispatch => ({
    deletePlaylist: playlistId => dispatch(deletePlaylist(playlistId)),
})

export default connect(
    null,
    mapDispatchToProps
)(SwipeablePlaylistItem)
