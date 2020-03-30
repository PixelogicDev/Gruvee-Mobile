import React from 'react'
import { FlatList, Image, TouchableOpacity, Text, View } from 'react-native'
import { connectInfiniteHits } from 'react-instantsearch-native'
import Styles from './InfiniteHitsList.styles'

const plusIcon = require('Gruvee/assets/icons/plus/plus_icon.png')

const InfiniteHitsList = ({ hits, hasMore, refine }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={Styles.HitItemContainer}>
            <View style={Styles.HitItemImage} />
            <Text style={Styles.HitItemUsername}>{item.username}</Text>
            <View style={Styles.HitItemAddButton}>
                <Image source={plusIcon} style={Styles.HitItemPlusIcon} />
            </View>
        </TouchableOpacity>
    )

    return (
        <FlatList
            data={hits}
            style={Styles.ListContainer}
            keyExtractor={item => item.objectID}
            onEndReached={() => hasMore && refine()}
            renderItem={renderItem}
        />
    )
}

export default connectInfiniteHits(InfiniteHitsList)
