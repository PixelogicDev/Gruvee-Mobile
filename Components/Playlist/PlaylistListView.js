import React from 'react'
import { Text, View, StyleSheet, Button, FlatList } from 'react-native'
import * as StyleConstants from '../../StyleConstants'

import CardItem from './CardItem'

const PlaylistListView = () => {
    const mockData = [
        {
            id: 'Playlist0',
            name: 'Cool Kids Music',
            numMembers: 1234,
            numSongs: 7,
        },
        {
            id: 'Playlist1',
            name: "YaBoi Alec's Playlist",
            numMembers: 1234,
            numSongs: 8000,
        },
        {
            id: 'Playlist2',
            name: 'Cool Cats',
            numMembers: 80,
            numSongs: 150,
        },
        {
            id: 'Playlist3',
            name: 'Cool Cats',
            numMembers: 80,
            numSongs: 150,
        },
    ]

    const styles = StyleSheet.create({
        Container: {
            backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
        },
        ContentContainer: {
            padding: 15,
        },
    })

    _keyExtractor = (item, index) => item.id
    _renderItem = ({ item }) => <CardItem playlistData={item} />

    return (
        <FlatList
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            data={mockData}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
        ></FlatList>
    )
}

export default PlaylistListView
