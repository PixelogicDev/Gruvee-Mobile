import React, { memo } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'

const defaultAlbumArtworkAsset = require('Gruvee/assets/defaults/album_artwork/default_album_cover_bg_image.png')

// Styles
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: StyleConstants.SONG_LIST_ITEM_BACKGROUND_COLOR,
        height: StyleConstants.SONG_LIST_ITEM_DETAIL_HEIGHT,
        borderTopLeftRadius: StyleConstants.LIST_ITEM_BORDER_RADIUS,
        borderTopRightRadius: StyleConstants.LIST_ITEM_BORDER_RADIUS,
    },
    Image: {
        width: StyleConstants.SONG_LIST_ITEM_ALBUM_ARTWORK_SIZE,
        height: StyleConstants.SONG_LIST_ITEM_ALBUM_ARTWORK_SIZE,
        borderTopLeftRadius: StyleConstants.LIST_ITEM_BORDER_RADIUS,
    },
    DetailContainer: {
        flexShrink: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
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

const SongItemDetail = ({ songData, platform }) => {
    const albumArtwork = getAlbumArtwork(songData, platform)
    return (
        <View style={styles.Container}>
            <Image
                style={styles.Image}
                source={albumArtwork}
                // Anroid debug builds ignore default source cuz why not?
                defaultSource={defaultAlbumArtworkAsset}
                resizeMode="cover"
            />
            <View style={styles.DetailContainer}>
                {/* TODO: Implement some sort of scroll for long Text */}
                <Text numberOfLines={1} style={styles.SongTitleText}>
                    {songData.name}
                </Text>
                <Text numberOfLines={1} style={styles.SongDetailText}>
                    {songData.creator}
                </Text>
                <Text numberOfLines={1} style={styles.SongDetailText}>
                    {songData.album}
                </Text>
            </View>
        </View>
    )
}

// Helpers
const getAlbumArtwork = (songData, platform) => {
    switch (platform) {
        case 'apple':
            return songData.apple.images
                ? { uri: songData.apple.images.url.replace('{w}', '160').replace('{h}', '160') }
                : null
        case 'spotify':
            return songData.spotify.images && songData.spotify.images.length
                ? { uri: songData.spotify.images[0].url }
                : null
        case 'youtube':
            console.log('Youtube not supported yet!')
            break
        default:
            console.warn(`${platform} is not a supported platform.`)
    }

    return null
}

export default memo(SongItemDetail)
