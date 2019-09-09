import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const AddButton = ({ style }) => {
    const addPlaylist = () => {
        alert('ADDING PLAYLIST.')
    }

    return (
        <TouchableOpacity onPress={addPlaylist} style={style}>
            <Image
                source={{ uri: 'add_playlist_button' }}
                style={{ width: '100%', height: '100%' }}
            />
        </TouchableOpacity>
    )
}

export default AddButton
