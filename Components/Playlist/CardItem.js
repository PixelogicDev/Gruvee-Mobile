import React from 'react'
import {
    Text,
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import CardItemDetail from './CardItemDetail'
import * as StyleConstants from '../../StyleConstants'

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
    },
    DetailContainer: {
        marginTop: 15,
        marginLeft: 15,
    },
})

const CardItem = props => {
    const { playlistData } = props

    // Test action for now
    const printPlaylistData = () => {
        alert(
            `${playlistData.name} | ${playlistData.numMembers} | ${playlistData.numSongs}`
        )
    }

    return (
        <TouchableOpacity style={styles.Container} onPress={printPlaylistData}>
            <ImageBackground
                style={styles.Container}
                source={{ uri: `${playlistData.albumArtworkUrl}` }}
                defaultSource={{ uri: 'default_item_bg_image' }}
            >
                <CardItemDetail
                    name={playlistData.name}
                    numMembers={playlistData.numMembers}
                    numSongs={playlistData.numSongs}
                />
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default CardItem
