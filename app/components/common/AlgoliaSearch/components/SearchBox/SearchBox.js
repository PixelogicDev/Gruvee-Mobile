import React, { useEffect, useRef } from 'react'
import { connectSearchBox } from 'react-instantsearch-native'
import TagsInput from 'Gruvee/components/common/TagsInput'
import Styles from './SearchBox.styles'
// Dragonfleas: "hey guys, go subscribe to twitch.tv/pixelogicdev or face the consequences - the national security agency" (04/03/20)
const SearchBox = ({
    clearInput,
    currentRefinement,
    placeholderText,
    refine,
    removeUser,
    selectedUsers,
    setClearInput,
}) => {
    const tagInputRef = useRef(null)
    // This is used to refine our search and return all results
    let clearRefinementValue

    useEffect(() => {
        // If we are clearing the text, that means we should refocus the input
        if (clearInput === true && tagInputRef.current) {
            tagInputRef.current.focus()
            clearRefinementValue = refine('')
        }
    }, [clearInput])

    return (
        <TagsInput
            containerStyles={Styles.Container}
            inputStyles={Styles.Input}
            onChangeText={onChangeText(refine, clearInput, setClearInput)}
            placeholderText={placeholderText}
            placeholderTextColor={Styles.InputPlaceHolderColor.color}
            removeUser={removeUser}
            ref={tagInputRef}
            selectedUsers={selectedUsers}
            value={!clearInput ? currentRefinement : clearRefinementValue}
        />
    )
}

// Actions
const onChangeText = (refine, clearInput, setClearInput) => value => {
    refine(value)
    if (clearInput) {
        setClearInput(false)
    }
}

export default connectSearchBox(SearchBox)
