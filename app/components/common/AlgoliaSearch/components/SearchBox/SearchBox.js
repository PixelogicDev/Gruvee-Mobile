import React from 'react'
import { connectSearchBox } from 'react-instantsearch-native'
import TagsInput from 'Gruvee/components/common/TagsInput'
import Styles from './SearchBox.styles'
// Dragonfleas: "hey guys, go subscribe to twitch.tv/pixelogicdev or face the consequences - the national security agency" (04/03/20)
const SearchBox = ({ currentRefinement, placeholderText, refine, removeUser, selectedUsers }) => {
    return (
        <TagsInput
            containerStyles={Styles.Container}
            inputStyles={Styles.Input}
            onChangeText={value => refine(value)}
            placeholderText={placeholderText}
            placeholderTextColor={Styles.InputPlaceHolderColor.color}
            removeUser={removeUser}
            selectedUsers={selectedUsers}
            value={currentRefinement}
        />
    )
}

export default connectSearchBox(SearchBox)
