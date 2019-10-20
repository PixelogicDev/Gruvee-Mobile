import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as NavigationConstants from 'lib/Helpers/NavigationConstants'
import images from 'res/images'

const addButtonAsset = images.buttons.add

const AddItemButton = ({ style, createAction, modalNavigateAction }) => {
    return (
        <TouchableOpacity onPress={modalNavigateAction} style={style}>
            <Image
                source={addButtonAsset}
                style={{ width: '100%', height: '100%' }}
            />
        </TouchableOpacity>
    )
}

export default AddItemButton
