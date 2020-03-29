import React from 'react'
import { TextInput } from 'react-native'
import { connectSearchBox } from 'react-instantsearch-native'
import Styles from './SearchBox.styles'

const SearchBox = ({ currentRefinement, placeholderText, refine }) => {
    return (
        <TextInput
            placeholder={placeholderText}
            placeholderTextColor={Styles.InputPlaceHolderColor.color}
            style={Styles.Input}
            onChangeText={value => refine(value)}
            value={currentRefinement}
        />
    )
}

export default connectSearchBox(SearchBox)
