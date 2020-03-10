import React, { useState } from 'react'
import { Alert } from 'react-native'
import AnimatedSwipeRow from 'Gruvee/components/common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/components/common/SwipeAction'
import * as StyleConstants from 'Gruvee/config/styles'

import CommentItem from './CommentItem'

const SwipeableCommentItem = ({ comment, deleteItemById }) => {
    // TODO: This will be needed from user state
    const signedInUsername = 'memberAlec'
    const [isDeleting, setIsDeleting] = useState(false)
    const [itemHeight, setItemHeight] = useState(StyleConstants.COMMENT_ITEM_MIN_HEIGHT)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeleteCommentAction = () => comfirmDeleteAlert(comment, onConfirmDelete)
    const setItemHeightAction = height => {
        setItemHeight(height)
    }

    return signedInUsername !== comment.sender ? (
        renderItem(comment, setItemHeightAction)
    ) : (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={() => {
                deleteItemById(comment.id)
            }}
            itemHeight={itemHeight} // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                comment,
                confirmDeleteCommentAction,
                signedInUsername
            )}
            listItemComponent={renderItem(comment, setItemHeightAction)}
        />
    )
}

// Actions
const comfirmDeleteAlert = (comment, onConfirmDelete) => {
    Alert.alert(
        'Delete Comment',
        `Come on, are you sure you want to delete your comment?`,
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
const renderItem = (comment, setItemHeightAction) => (
    <CommentItem comment={comment} setHeightAction={setItemHeightAction} />
)

const renderSwipeActionComponent = (comment, confirmDeleteCommentAction, signedInUsername) => {
    if (signedInUsername === comment.sender) {
        // eslint-disable-next-line global-require
        const trashIconAsset = require('Gruvee/assets/icons/trash/trash_icon.png')

        return (
            <SwipeAction
                name="Delete Action Button"
                action={() => {
                    confirmDeleteCommentAction(comment)
                }}
                icon={trashIconAsset}
                actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
                width={19}
                height={25}
            />
        )
    }

    return null
}

export default SwipeableCommentItem
