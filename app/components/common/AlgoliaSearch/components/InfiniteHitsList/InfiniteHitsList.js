import React from 'react'
import { FlatList, Image, TouchableOpacity, Text, View } from 'react-native'
import { connectInfiniteHits } from 'react-instantsearch-native'
import Styles from './InfiniteHitsList.styles'

const plusIcon = require('Gruvee/assets/icons/plus/plus_icon.png')

const InfiniteHitsList = ({ hits, hasMore, selectedUsers, selectUser, refine }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={Styles.HitItemContainer}
            onPress={() => {
                selectUser(item)
            }}
        >
            <View style={Styles.HitItemImage} />
            <Text style={Styles.HitItemUsername}>{item.username}</Text>
            <View style={Styles.HitItemAddButton}>
                <Image source={plusIcon} style={Styles.HitItemPlusIcon} />
            </View>
        </TouchableOpacity>
    )

    return (
        <FlatList
            data={filteredHits(hits, selectedUsers)}
            style={Styles.ListContainer}
            keyExtractor={item => item.objectID}
            onEndReached={() => hasMore && refine()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    )
}

const filteredHits = (hits, selectedUsers) => {
    const userIds = selectedUsers.map(user => user.objectID)
    return hits.filter(hit => !userIds.includes(hit.objectID))
}

export default connectInfiniteHits(InfiniteHitsList)
