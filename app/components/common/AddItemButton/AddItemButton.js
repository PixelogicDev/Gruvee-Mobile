import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const addButtonAsset = require('Gruvee/assets/buttons/add/add_button.png')

const AddItemButton = ({ style, addItemAction }) => {
    return (
        <TouchableOpacity onPress={addItemAction} style={style}>
            <Image source={addButtonAsset} style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
    )
}

export default AddItemButton
