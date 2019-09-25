import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

import * as StyleConstants from '../../StyleConstants'
import CardItem from './CardItem'
import AddButton from './Buttons/AddButton'

// Remove broken path warning
console.disableYellowBox = true
console.ignoredYellowBox = ['Could not find image']

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
        name: 'Y A G',
        numMembers: 667,
        numSongs: 100,
        albumArtworkUrl: 'https://i.imgur.com/uoMh2y3.png',
    },
]
const styles = StyleSheet.create({
    Container: {
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
    ContentContainer: {
        padding: 25,
        paddingBottom: 100,
    },
    ButtonContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    Button: {
        width: StyleConstants.ADD_BUTTON_SIZE,
        height: StyleConstants.ADD_BUTTON_SIZE,
    },
})

const PlaylistListView = () => {
    const [playlists, setPlaylist] = useState([])
    const keyExtractor = (item, index) => item.id
    const renderHiddenItem = ({}) => <SwipeAction />
    const renderItem = ({ item }) => (
        <CardItem
            playlistData={item}
            deletePlaylistAction={deletePlaylistAction}
            isLastItem={playlists.length === 1}
        />
    )

    useEffect(() => {
        // Call API set to playlists
        setPlaylist(mockData)
    }, [])

    const createPlaylistAction = playlist => {
        // Set State
        setPlaylist([...playlists, playlist])
    }

    const deletePlaylistAction = playlistToDeleteId => {
        setPlaylist(
            playlists.filter(playlist => playlist.id !== playlistToDeleteId)
        )
    }

    return (
        <>
            <SwipeListView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                data={playlists}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            ></SwipeListView>

            {/* MADPROPZ poopuhchoo */}
            <View style={styles.ButtonContainer}>
                <AddButton
                    style={styles.Button}
                    createAction={createPlaylistAction}
                ></AddButton>
            </View>
        </>
    )
}

export default PlaylistListView
