import React, { useState } from 'react'
import { Alert } from 'react-native'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Common/SwipeAction'
import SongItem from '../SongItem/SongItem'
import * as StyleConstants from '@StyleConstants'

// deleteItemById === func
const SwipeableSongItem = ({ song, deleteItemById }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const onConfirmDelete = () => setIsDeleting(true)

    const [toggleCommentsSection, setToggleCommentsSection] = useState(false)
    const toggleCommentsSectionAction = () => {
        setToggleCommentsSection(!toggleCommentsSection)
    }

    const confirmDeleteSongAction = () =>
        comfirmDeleteAlert(song, onConfirmDelete)

    return (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={deleteItemById}
            itemHeight={
                toggleCommentsSection
                    ? StyleConstants.SONG_LIST_COMMENT_SECTION_HEIGHT +
                      StyleConstants.SONG_LIST_ITEM_HEIGHT_iOS
                    : StyleConstants.SONG_LIST_ITEM_HEIGHT_iOS
            } // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                song,
                confirmDeleteSongAction
            )}
            listItemComponent={renderSongItem(
                song,
                toggleCommentsSectionAction,
                toggleCommentsSection
            )}
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
const renderSongItem = (
    song,
    toggleCommentsSectionAction,
    toggleCommentsSection
) => (
    <SongItem
        songData={song}
        toggleCommentsSectionAction={toggleCommentsSectionAction}
        toggleCommentsSection={toggleCommentsSection}
    />
)

const renderSwipeActionComponent = (song, confirmDeleteSongAction) => {
    // eslint-disable-next-line global-require
    const trashIconAsset = require('Gruvee/Assets/Icons/Trash/trash_icon.png')

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
