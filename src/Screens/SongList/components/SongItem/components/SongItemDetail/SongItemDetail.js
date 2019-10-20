import React, { memo } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import images from 'res/images'
import * as StyleConstants from 'lib/Helpers/StyleConstants'

const defaultAlbumArtworkAsset = images.defaults.albumCover

const SongItemDetail = ({ songData }) => {
    return (
        <View style={styles.Container}>
            <Image
                style={styles.Image}
                source={{ uri: songData.albumArtwork }}
                // Anroid debug builds ignore default source cuz why not?
                defaultSource={defaultAlbumArtworkAsset}
                resizeMode="cover"
            />
            <View style={styles.DetailContainer}>
                <Text style={styles.SongTitleText}>{songData.name}</Text>
                <Text style={styles.SongDetailText}>{songData.artist}</Text>
                <Text style={styles.SongDetailText}>{songData.album}</Text>
            </View>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: StyleConstants.SONG_LIST_ITEM_BACKGROUND_COLOR,
        height: StyleConstants.SONG_LIST_ITEM_DETAIL_HEIGHT,
        borderTopLeftRadius: StyleConstants.SONG_LIST_ITEM_BORDER_RADIUS,
        borderTopRightRadius: StyleConstants.SONG_LIST_ITEM_BORDER_RADIUS,
    },
    Image: {
        width: StyleConstants.SONG_LIST_ITEM_ALBUM_ARTWORK_SIZE,
        height: StyleConstants.SONG_LIST_ITEM_ALBUM_ARTWORK_SIZE,
        borderTopLeftRadius: StyleConstants.SONG_LIST_ITEM_BORDER_RADIUS,
        marginRight: 15,
    },
    DetailContainer: {
        paddingTop: 5,
        paddingBottom: 8,
    },
    SongTitleText: {
        fontSize: StyleConstants.SONG_LIST_ITEM_TITLE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
        paddingBottom: 5,
    },
    SongDetailText: {
        fontSize: StyleConstants.SONG_LIST_ITEM_DETAIL_SIZE_iOS,
        color: StyleConstants.SONG_LIST_ITEM_DETAIL_COLOR,
    },
})

export default memo(SongItemDetail)
