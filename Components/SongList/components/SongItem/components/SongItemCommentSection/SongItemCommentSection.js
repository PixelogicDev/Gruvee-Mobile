import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import * as StyleConstants from '@StyleConstants'
import CommentItem from './components/CommentItem/CommentItem'

const SongItemCommentSection = ({ comments }) => {
    // WILL PROBABLY NEED TO SET STATE
    const renderItem = ({ item }) => <CommentItem comment={item} />
    const separatorItem = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    marginLeft: '3%',
                    width: '95%',
                    backgroundColor: '#979797',
                }}
            />
        )
    }
    return (
        <FlatList
            style={styles.Container}
            data={comments}
            renderItem={renderItem}
            ItemSeparatorComponent={separatorItem}
        />
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: StyleConstants.SONG_LIST_COMMENT_SECTION_HEIGHT,
        backgroundColor: '#000000',
        overflow: 'scroll',
        paddingBottom: 50,
        flexGrow: 1,
    },
})

export default SongItemCommentSection
