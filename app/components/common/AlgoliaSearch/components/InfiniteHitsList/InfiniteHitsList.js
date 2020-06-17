import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Image, TouchableOpacity, Text, View } from 'react-native'
import { connectInfiniteHits } from 'react-instantsearch-native'
import Styles from './InfiniteHitsList.styles'

const plusIcon = require('Gruvee/assets/icons/plus/plus_icon.png')

const ConnectedInfiniteHitsList = ({
    currentUser,
    hits,
    hasMore,
    selectedUsers,
    selectUser,
    refine,
}) => {
    const renderItem = ({ item }) => {
        const profileImage = item.profileImage !== '' ? { uri: item.profileImage } : null
        return (
            <TouchableOpacity
                style={Styles.HitItemContainer}
                onPress={() => {
                    selectUser(item)
                }}
            >
                <Image source={profileImage} style={Styles.HitItemImage} />
                <Text style={Styles.HitItemUsername}>{item.displayName}</Text>
                <View style={Styles.HitItemAddButton}>
                    <Image source={plusIcon ?? null} style={Styles.HitItemPlusIcon} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={filterHits(hits, selectedUsers, currentUser)}
            style={Styles.ListContainer}
            keyExtractor={item => item.objectID}
            onEndReached={() => hasMore && refine()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    )
}

const filterHits = (hits, selectedUsers, currentUser) => {
    const filteredHits = hits.filter(hit => hit.objectID !== currentUser.id)
    const userIds = selectedUsers.map(user => user.objectID)
    return filteredHits.filter(hit => !userIds.includes(hit.objectID))
}

const mapStateToProps = state => {
    return {
        currentUser: state.UserDataReducer.user,
    }
}

const InfiniteHitsList = connect(mapStateToProps)(ConnectedInfiniteHitsList)
export default connectInfiniteHits(InfiniteHitsList)
