import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'

import AnimatedSwipeRow from 'Gruvee/components/common/AnimatedSwipeRow'
import { DidUserAddSongSelector } from 'Gruvee/redux/selectors/SongsSelector'
import SwipeAction from 'Gruvee/components/common/SwipeAction'
import * as StyleConstants from 'Gruvee/config/styles'
import SongItem from './SongItem'

const SwipeableSongItem = ({ song, deleteSongById, didUserAddSong }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeleteSongAction = () => comfirmDeleteAlert(song, onConfirmDelete)

    return didUserAddSong ? (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={deleteSongById}
            itemHeight={StyleConstants.SONG_LIST_ITEM_HEIGHT_iOS} // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(song, confirmDeleteSongAction)}
            listItemComponent={renderSongItem(song)}
        />
    ) : (
        renderSongItem(song)
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
const renderSongItem = song => {
    return <SongItem songData={song} />
}

const renderSwipeActionComponent = (song, confirmDeleteSongAction) => {
    // eslint-disable-next-line global-require
    const trashIconAsset = require('Gruvee/assets/icons/trash/trash_icon.png')

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

// Redux Mappers
const mapStateToProps = (state, props) => {
    return {
        didUserAddSong: DidUserAddSongSelector(state, props),
    }
}

export default connect(mapStateToProps, null)(SwipeableSongItem)
