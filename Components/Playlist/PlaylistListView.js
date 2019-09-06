import React from 'react'
import { Text, View, StyleSheet, Button, FlatList } from 'react-native'
import * as StyleConstants from '../../StyleConstants'
import CardItem from './CardItem'

const mockData = [
    {
        id: 'Playlist0',
        name: 'Cool Kids Music',
        numMembers: 1234,
        numSongs: 7,
        albumArtworkUrl: 'SomeBrokenImagePath',
    },
    {
        id: 'Playlist1',
        name: "YaBoi Alec's Playlist",
        numMembers: 1234,
        numSongs: 8000,
        albumArtworkUrl:
            'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930',
    },
    {
        id: 'Playlist2',
        name: 'Cool Cats',
        numMembers: 80,
        numSongs: 150,
        albumArtworkUrl: 'SomeBrokenImagePath',
    },
    {
        id: 'Playlist3',
        name: 'Cool Cats',
        numMembers: 80,
        numSongs: 150,
        albumArtworkUrl:
            'http://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
    },
]

const PlaylistListView = () => {
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
            showsVerticalScrollIndicator={false}
            data={mockData}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
        ></FlatList>
    )
}

export default PlaylistListView
