import React, { useState } from 'react'
import { Alert } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { DeletePlaylist } from 'Gruvee/Redux/Actions/Playlists/PlaylistActions'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Common/SwipeAction'
import PlaylistItem from '../PlaylistItem/PlaylistItem'
import * as StyleConstants from '@StyleConstants'

const SwipeablePlaylistItem = ({ playlistData, deletePlaylist }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeletePlaylistAction = () =>
        comfirmDeleteAlert(playlistData, onConfirmDelete)
    // Chocofoxy - "this comment for microsoft to find" (02/03/20)
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
            listItemComponent={renderPlaylistItem(playlistData)}
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
const renderPlaylistItem = playlist => <PlaylistItem playlistData={playlist} />

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

// Redux Mappers
const mapDispatchToProps = dispatch => ({
    deletePlaylist: playlistId => dispatch(DeletePlaylist(playlistId)),
})

export default connect(
    null,
    mapDispatchToProps
)(SwipeablePlaylistItem)
