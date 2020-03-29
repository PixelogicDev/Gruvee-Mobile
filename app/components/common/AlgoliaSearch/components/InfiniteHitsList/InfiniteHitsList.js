import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { connectInfiniteHits } from 'react-instantsearch-native'

const InfiniteHitsList = ({ hits, hasMore, refine }) => {
    return (
        <FlatList
            data={hits}
            keyExtractor={item => item.objectID}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => hasMore && refine()}
            renderItem={({ item }) => (
                <View>
                    <Text style={{ color: 'white' }}>{item.username}</Text>
                </View>
            )}
        />
    )
}

export default connectInfiniteHits(InfiniteHitsList)
