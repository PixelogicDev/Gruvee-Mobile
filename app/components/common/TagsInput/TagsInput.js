import React, { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import TagInputItem from './components/TagInputItem'
import Styles from './TagsInput.styles'

const TagsInput = ({
    containerStyles,
    inputStyles,
    onChangeText,
    placeholderText,
    placeholderTextColor,
    removeUser,
    selectedUsers,
    value,
}) => {
    const [higlightedIndex, setHighlightedIndex] = useState(-1)

    useEffect(() => {
        setHighlightedIndex(-1)
    }, [selectedUsers])

    return (
        <View style={containerStyles || Styles.Container}>
            {renderSelectedUsers(selectedUsers, higlightedIndex)}
            <TextInput
                onChangeText={onChangeText}
                onKeyPress={backspace(
                    value,
                    selectedUsers,
                    higlightedIndex,
                    setHighlightedIndex,
                    removeUser
                )}
                placeholder={!selectedUsers.length && placeholderText ? placeholderText : ''}
                placeholderTextColor={placeholderTextColor}
                style={inputStyles}
                value={value}
            />
        </View>
    )
}

// Actions
const renderSelectedUsers = (selectedUsers, higlightedIndex) =>
    // isHighlighted: If its the last index in the array && BackspaceIndex === this index
    selectedUsers.map((user, index) => (
        <TagInputItem key={user.objectID} isHighlighted={higlightedIndex === index} user={user} />
    ))

const backspace = (value, selectedUsers, highlightedIndex, setHighlightedIndex, removeUser) => ({
    nativeEvent,
}) => {
    // Check if already highlighted
    if (nativeEvent.key === 'Backspace' && !value) {
        if (highlightedIndex !== -1) {
            // Delete
            removeUser(selectedUsers[highlightedIndex].objectID)
            setHighlightedIndex(-1)
        } else {
            setHighlightedIndex(selectedUsers.length - 1)
        }
    }
}

export default TagsInput
