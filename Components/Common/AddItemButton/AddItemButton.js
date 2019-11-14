import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const addButtonAsset = require('Gruvee/Assets/Buttons/AddButton/add_button.png')

const AddItemButton = ({ style, modalNavigateAction }) => {
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
