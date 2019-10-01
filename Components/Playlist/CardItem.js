import React, { useRef, useState } from 'react'
import {
    Alert,
    Animated,
    Dimensions,
    Text,
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import { Navigation } from 'react-native-navigation'

import CardItemDetail from './CardItemDetail'
import SwipeAction from './SwipeAction'
import * as StyleConstants from '../../StyleConstants'
import * as NavigationConstants from '../../NavigationConstants'

const styles = StyleSheet.create({
    SwipeContainer: (isDeleting, height) => ({
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: height,
        opacity: isDeleting ? 0 : 1,
    }),
    AnimatedContainer: height => ({
        height: height,
        marginBottom: 20,
    }),
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
        overflow: 'hidden',
    },
    DetailContainer: {
        marginTop: 15,
        marginLeft: 15,
    },
})

const CardItem = ({ playlistData, deletePlaylistAction, isLastItem }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [shrinkHeight, setShrinkHeight] = useState(new Animated.Value(200))
    const swipeRef = useRef(null)

    const showSongListAction = () => {
        Navigation.push(NavigationConstants.PLAYLIST_NAV_ID, {
            component: {
                name: NavigationConstants.SONG_LIST_NAV_NAME,
                options: {
                    topBar: {
                        title: {
                            text: playlistData.name,
                        },
                    },
                },
            },
        })
    }

    //-- MADPROPZ poopuhchoo --//
    const runDeleteAction = () => {
        if (swipeRef.current && swipeRef.current.manuallySwipeRow) {
            setIsDeleting(true)
            swipeRef.current.manuallySwipeRow(
                -Math.round(Dimensions.get('window').width),
                () => {
                    if (isLastItem) {
                        deletePlaylistAction(playlistData.id)
                    }
                }
            )

            if (!isLastItem) {
                Animated.timing(shrinkHeight, {
                    toValue: 0,
                    duration: 250,
                }).start(() => {
                    deletePlaylistAction(playlistData.id)
                })
            }
        }
    }

    const confirmDeletePlaylistAction = () => {
        Alert.alert(
            'Delete Playlist',
            `Come on, are you sure you want to delete ${playlistData.name}?`,
            [
                {
                    text: 'Delete',
                    onPress: runDeleteAction,
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        )
    }

    return (
        <SwipeRow rightOpenValue={-75} ref={swipeRef}>
            <Animated.View
                style={styles.SwipeContainer(isDeleting, shrinkHeight)}
            >
                <SwipeAction
                    name={'Delete Action Button'}
                    action={() => {
                        confirmDeletePlaylistAction()
                    }}
                    iconName={'trash_icon'}
                    actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
                    width={19}
                    height={25}
                />
            </Animated.View>
            <Animated.View style={styles.AnimatedContainer(shrinkHeight)}>
                <TouchableOpacity onPress={showSongListAction}>
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
            </Animated.View>
        </SwipeRow>
    )
}

export default CardItem
