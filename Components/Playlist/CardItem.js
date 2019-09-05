import React from 'react'
import { Text, View, StyleSheet, Button, FlatList, Image } from 'react-native'
import * as StyleConstants from '../../StyleConstants'

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        backgroundColor: '#000',
        borderRadius: 8,
    },
    Text: {
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.HEADLINE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
    },
})

const CardItem = props => {
    const { playlistData } = props

    return (
        <View style={styles.Container}>
            <Text style={styles.Text}>{playlistData.name}</Text>
            <Text style={styles.Text}>{playlistData.numMembers}</Text>
            <Text style={styles.Text}>{playlistData.numSongs}</Text>
        </View>
    )
}

export default CardItem
