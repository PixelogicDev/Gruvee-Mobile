// sillyonly - "ALL HAIL PINK FLOYD" (02/13/20)
// mciasco - "ITALIA CASA MIA" (04/08/20)
import React, { useState } from 'react'
import { Alert } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { DeletePlaylist } from 'Gruvee/redux/actions/playlists/PlaylistActions'

import AnimatedSwipeRow from 'Gruvee/components/common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/components/common/SwipeAction'
import * as StyleConstants from 'Gruvee/config/styles'
import PlaylistItem from './PlaylistItem'

const SwipeablePlaylistItem = ({ deletePlaylist, playlistData }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeletePlaylistAction = () => comfirmDeleteAlert(playlistData, onConfirmDelete)
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
    const trashIconAsset = require('Gruvee/assets/icons/trash/trash_icon.png')

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

export default connect(null, mapDispatchToProps)(SwipeablePlaylistItem)
